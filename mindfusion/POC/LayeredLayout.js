var Diagram = MindFusion.Diagramming.Diagram;
var DiagramLink = MindFusion.Diagramming.DiagramLink;
var ShapeNode = MindFusion.Diagramming.ShapeNode;

var Rect = MindFusion.Drawing.Rect;
var LayeredLayout = MindFusion.Graphs.LayeredLayout;
var LayoutDirection = MindFusion.Graphs.LayoutDirection;

var diagram = null;

Sys.Application.add_load(function (sender, args)
{
	// create a Diagram component that wraps the "diagram" canvas
	diagram = $create(Diagram, null, null, null, $get("diagram"));
	diagram.setLinkHeadShapeSize(2);

	// create an Overview component that wraps the "overview" canvas
	var overview = $create(MindFusion.Diagramming.Overview,
        null, null, null, $get("overview"));
	overview.setDiagram(diagram);
});

function onRandomGraph()
{
	randomGraph(20);
	applyLayeredLayout();
}

function randomGraph(n)
{
	diagram.clearAll();

	for (var i = 0; i < n; ++i)
	{
		var c = diagram.nodes.length;
		var g = 2 + randomInt(15);
		for (var j = 0; j < g; ++j)
		{
			var rect = new Rect(0, 0, 10, 10);
			var node = new ShapeNode(diagram);
			node.setBounds(rect);
			node.setBrush({ type: "LinearGradientBrush", color1: "LightGray", color2: "Black", angle: 60 });
			diagram.addItem(node);
			if (j > 0)
			{
				var link = new DiagramLink(
					diagram, diagram.nodes[diagram.nodes.length - 2], node);
				diagram.addItem(link);
			}
		}
		if (i > 0)
		{
			for (var j = 0; j < 1 + randomInt(3); ++j)
			{
				var link = new DiagramLink(
					diagram, diagram.nodes[randomInt(c)], diagram.nodes[c + randomInt(g)]);
				diagram.addItem(link);
			}
		}
	}
}

function applyLayeredLayout()
{
	var layout = new LayeredLayout();
	layout.direction = LayoutDirection.TopToBottom;
	layout.siftingRounds = 0;
	layout.nodeDistance = 8;
	layout.layerDistance = 8;
	diagram.arrange(layout);
	diagram.resizeToFitItems();
}

function randomInt(max)
{
	return Math.floor(max * Math.random());
}