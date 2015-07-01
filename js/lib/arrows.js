'use strict';

function normal(parent, id, edge, type) {
  var marker = parent.append('marker')
    .attr('id', id)
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 9)
    .attr('refY', 5)
    .attr('markerUnits', 'strokeWidth')
    .attr('markerWidth', 8)
    .attr('markerHeight', 6)
    .attr('orient', 'auto');

  marker.append('path')
    .attr('d', 'M 0 0 L 10 5 L 0 10 z')
    .style('stroke-width', 1)
    .style('stroke-dasharray', '1,0')
    .attr('style', edge[type + 'Style']);
}

function vee(parent, id, edge, type) {
  var marker = parent.append('marker')
    .attr('id', id)
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 9)
    .attr('refY', 5)
    .attr('markerUnits', 'strokeWidth')
    .attr('markerWidth', 8)
    .attr('markerHeight', 6)
    .attr('orient', 'auto');

  marker.append('path')
    .attr('d', 'M 0 0 L 10 5 L 0 10 L 4 5 z')
    .style('stroke-width', 1)
    .style('stroke-dasharray', '1,0')
    .attr('style', edge[type + 'Style']);
}

function undirected(parent, id, edge, type) {
  var marker = parent.append('marker')
    .attr('id', id)
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 9)
    .attr('refY', 5)
    .attr('markerUnits', 'strokeWidth')
    .attr('markerWidth', 8)
    .attr('markerHeight', 6)
    .attr('orient', 'auto');

  marker.append('path')
    .attr('d', 'M 0 5 L 10 5')
    .style('stroke-width', 1)
    .style('stroke-dasharray', '1,0')
    .attr('style', edge[type + 'Style']);
}

module.exports = {
  'default': normal,
  'normal': normal,
  'vee': vee,
  'undirected': undirected
};
