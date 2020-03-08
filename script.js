var name = "Thakur Malkhan Singh";
var data = [
  {
    name= "Thakur Malkhan Singh",
    date: "Wed Sep 03 1889 20:43:05 GMT-0400 (EDT)"
    
  },
  {
    name = "Sidhyavati",
    date: "Thu Sep 04 1901 01:50:51 GMT-0400 (EDT)"
  },
  {
    name = "Sarla",
    date: "Sat Sep 13 1920 05:45:04 GMT-0400 (EDT)"
  },
  {
    name = "Sushila",
    date: "Mon Sep 15 1923 11:26:33 GMT-0400 (EDT)"
  },
  {
    name = "Virendra",
    date: "Tue Sep 16 1926 05:40:35 GMT-0400 (EDT)"
  },
  {
    name = "Urmila",
    date: "Wed Sep 17 1929 23:38:53 GMT-0400 (EDT)"
  },
  {
    name = "Nripendra",
    date: "Sun Sep 21 1938 16:42:47 GMT-0400 (EDT)"
  },
  {
    count: 19,
    date: "Thu Sep 25 1916 16:57:42 GMT-0400 (EDT)"
  },
  {
    count: 2,
    date: "Fri Sep 26 1954 21:56:27 GMT-0400 (EDT)"
  },
  {
    count: 1,
    date: "Sat Oct 04 1956 01:52:43 GMT-0400 (EDT)"
  },
  {
    count: 1,
    date: "Sat Oct 04 1958 15:57:51 GMT-0400 (EDT)"
  },
  {
    count: 5,
    date: "Sat Oct 04 1960 22:13:53 GMT-0400 (EDT)"
  },
  {
    count: 1,
    date: "Sat Oct 25 1926 17:25:35 GMT-0400 (EDT)"
  },
  {
    count: 15,
    date: "Wed Nov 05 1964 00:16:09 GMT-0500 (EST)"
  },
  {
    count: 1,
    date: "Wed Nov 05 1966 22:57:16 GMT-0500 (EST)"
  },
  {
    count: 2,
    date: "Fri Nov 07 1969 21:48:50 GMT-0500 (EST)"
  }
];

// Perform some data type conversion
data.forEach(function ( d ) {
  d.date = new Date(d.date);
});

var el = d3.select('#chart'),
    svg = null,
    chart = null,
    width = document.getElementById('chart').offsetWidth,
    height = document.getElementById('chart').offsetHeight,
    minObjHeight = 10,
    maxObjHeight = height*0.25,
    margin = {
      top:    maxObjHeight*2,
      right:  maxObjHeight*4,
      bottom: maxObjHeight*2,
      left:   maxObjHeight*4
    },
    mostRecent = d3.max(data, function ( d ) { return d.date; }),
    oldest = d3.min(data, function ( d ) { return d.date; }),
    self = this;

// Setup our x scale. This will convert a date
// to an x coordinate
var x = d3.time.scale()
  .domain([
    d3.min(data, function ( d ) { return d.date; }),
    d3.max(data, function ( d ) { return d.date; })
  ])
  .range([0, width - margin.right]);

// Reorder the data by count. This allows for larger
// counts (larger circles) to be rendered first.
// i.e. below smaller circles.
data.sort(function ( a, b ) {
  return d3.descending(a.count, b.count);
});

// Setup radius scale.
var r = d3.scale.linear()
  .clamp(true)
  .domain([1, d3.max(data, function ( d, i ) {
    // We're going to assume that the first count
    // represents the initial load, which could be
    // a large number and would skew the subsequent
    // radius scaling.
    return (i === 0) ? 1 : d.count;
  })])
  .range([minObjHeight, maxObjHeight]);

var xAxis = d3.svg.axis()
  .scale(x)
  .ticks(4)
  .tickSize(0)
  .tickPadding(10);

var zoom = d3.behavior.zoom()
  .x(x)
  .scaleExtent([1,Infinity])
  .on('zoom', function() {
    draw();
  });

var svg = el.append('svg')
  .attr('id', 'svg')
  .attr('height', height)
  .attr('width', width);
var chart = svg.append('g')
  .attr('transform', 'translate(' + (margin.left * 0.5) + ', 0)');

var tooltip = d3.select('body').append('div')
  .classed('tooltip', true)
  .style('z-index', 9000)
  .style('opacity', 0);
tooltip.append('div').classed('down-arrow', true);
tooltip.append('div').classed('content', true);

var dateAxis = chart.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0, ' + (height-24) + ')');

var midline = chart.append('line')
  .attr('class', 'midline')
  .attr('x1', 0 - margin.left * 0.5)
  .attr('y1', height * 0.5)
  .attr('x2', width)
  .attr('y2', height * 0.5);

var timeframe = chart.append('line')
  .attr('class', 'timeframe')
  .attr('y1', height * 0.5)
  .attr('y2', height * 0.5);

var zoomTarget = chart.append('rect')
  .attr('class', 'pane')
  .attr('width', width)
  .attr('height', height)
  .style('cursor', 'move')
  .style('fill', 'none')
  .style('pointer-events', 'all')
  .call(zoom);

var circles = chart.selectAll('circle')
  .data(data);

circles.enter().append('circle')
  .attr('cy', height*0.5)
  .attr('r', function ( d ) {
    return r(d.count);
  })
  .on('mouseover', function ( d ) {
    var format = d3.time.format('%d/%m/%y'),
/*        message = format(new Date(d.date)) + '<br/>' + d.count + ((d.count === 1) ? 'birth' : ' death'),*/
        
        message = name + '<br/>' + ((d.count === 1) ? 'death' : ' birth'),

        svgTop = document.getElementById('svg').offsetTop,//33
        svgLeft = document.getElementById('svg').offsetLeft,//33
        circle = d3.select(this),
        circleX = parseInt(circle.attr('cx'), 10),
        circleY = parseInt(circle.attr('cy'), 10),
        circleR = parseInt(circle.attr('r'), 10),
        left,
        top;
    circle.classed('hover', true);
    // Calculate positioning
    // 56 = tooltip height
    // 5 = spacer
  console.log(svgTop, circleY, circleR);
    top = svgTop + circleY - circleR - 56 - 5;
    // 110 = tooltip width
    left = svgLeft - 110*0.5 + margin.left*0.5 + circleX;
    tooltip.transition()
      .duration(200)
      .style('opacity', 1);
    tooltip
      .style('left', left + 'px')
      .style('top', top + 'px')
      .select('.content').html(message);
  })
  .on('mouseout', function () {
    d3.select(this).classed('hover', false);
    tooltip.transition()
      .duration(500)
      .style('opacity', 0);
  });

circles.exit().remove();

var draw = function () {
  dateAxis.call(xAxis);
  circles.attr('cx', function ( d ) {
    return x(d.date);
  });
  timeframe.attr('x1', function () {
    return x(oldest);
  });
  timeframe.attr('x2', function () {
    return x(mostRecent);
  });
};

var resize = function () {
  var width = document.getElementById('chart').offsetWidth;
  //Update width related values
  x.range([0, width - margin.right]);
  svg.attr('width', width);
  midline.attr('x2', width);
  zoomTarget.attr('width', width);
  draw();
};

d3.select(window).on('resize', resize);

draw();
