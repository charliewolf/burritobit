var React = require('react');
var jquery = require('jquery');
var superagent = require('superagent');
// Utility Functions 
function strip_tags(html) {
    var div = document.createElement("div");
    div.innerHTML = html;
    console.log(div.textContent || div.innerText || "");
    return (div.textContent || div.innerText || "");
}

// React Elements
var NewsItemWrapper = React.createClass({
    getInitialState: function() {
        return {
            expanded: false
        };
    },
    expand: function() {
        this.setState({
            expanded: true
        });
    },
    hide: function() {
        this.setState({
            expanded: false
        });
    },
    toggle: function() {
        if (this.state.expanded) this.hide();
        else this.expand();
    },
    render: function() {
        return <li><i className="fa-li fa fa-newspaper-o"></i><a href='javascript:;' onClick={this.toggle}>{this.props.data.find('title').text().replace(/itcoin/ig, 'urrito').replace(/BTC/g,'Burritos')}</a>
        { this.state.expanded && <div className='summary'>{strip_tags(this.props.data.find('description').text()).replace(/itcoin/ig, 'urrito').replace(/BTC/g,'Burritos')}</div> }
        </li>;
    }
});

var NewsFeed = React.createClass({
    render: function() {
        return <ul className='fa-ul'>
        {jquery.makeArray(jquery(decodeURIComponent(this.props.rss)).find('item').map(function(idx, item){
           return <NewsItemWrapper data={jquery(item)} key={idx} />;
        }))} 
      </ul>
    }
});

// Logic Functions


function renderNews() {
    superagent.get('http://crossorigin.me/http://feeds.feedburner.com/CoinDesk').end(function(err, res) {
        var rss = res.text;
        if (!err) React.render(<NewsFeed rss={encodeURIComponent(rss)} />, document.getElementById('body'));
        console.log('done');
    });
};


// Events

window.addEventListener('load', renderNews);
window.addEventListener('load', function() {
    setInterval(renderNews, 900000);
});
