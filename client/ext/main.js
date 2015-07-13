Ext.onReady(function(){

Ext.namespace("xtimer.org");


var contextmenu = Ext.create('Ext.menu.Menu', {
            width: 100,
            height: 100,
            margin: '0 0 10 0',

            items: [{
                text: 'run',
                handler:function(){test();}
            },{
                text: 'regular item 2',
                descrption:'xxxxxxxx'
            },{
                text: 'regular item 3',
                descrption:'xxxxxxxx'
            }]
        });
	// Ext.MessageBox.alert('xx','xx');
	xtimer.org.tree = new Ext.tree.TreePanel({
	id:'project_tree',
	title:'Project List',
	region:'west',
	border:true,
	width:400,
	collapsible:true,
	fields: ['name', 'title', 'status'],
    columns: [{
            xtype: 'treecolumn',
            text: 'name',
            dataIndex: 'name',
            width: 150,
            sortable: true
        }, {
            text: 'title	',
            dataIndex: 'title',
            flex: 1,
            sortable: true
        }, {
            text: 'status	',
            dataIndex: 'status',
            flex: 1,
            sortable: true
        }],
	listeners : {
		itemcontextmenu: function(view, record, item, index, event, options) {
			event.preventDefault();  
            event.stopEvent();  
        contextmenu.showAt(event.getXY());
    },
    	click:{
    		element:'body',
    		fn:function(){contextmenu.hide();}
    	}
            }
	// renderTo: 'tree',
	// root: new Ext.tree.TreeNode({text:'ROOT'})
});

    var root = {
    	id:'root',
        expanded: true,
        name: "Projects",
        children: [
            { id:'project_1',name: "project_1", title:'xxxx', status:'running', leaf: true },
            { name: "project_2", title:'xxxx', status:'running',expanded: true, children: [
                { name: "case_1", title:'xxxx', status:'running',leaf: true },
                { name: "case_2", title:'xxxx', status:'running',leaf: true}
            ] }
        ]
    };
    xtimer.org.tree.setRootNode(root);



Ext.create('Ext.data.Store', {
    storeId:'simpsonsStore',
    fields:['name', 'email', 'phone'],
    data:{'items':[
        { 'name': 'Step 1',  "email":"lisa@simpsons.com"  },
        { 'name': 'Step 2',  "email":"bart@simpsons.com" },
        { 'name': 'Step 3', "email":"homer@simpsons.com"  },
        { 'name': 'Step 4', "email":"marge@simpsons.com" }
    ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});

	var prepare = new Ext.grid.GridPanel({
		title: 'Prepare',
    store: Ext.data.StoreManager.lookup('simpsonsStore'),
    columns: [
        { text: 'Name',  dataIndex: 'name' },
        { text: 'Email', dataIndex: 'email', flex: 1 },
    ],
    height: 200,
	});











    var viewport = new Ext.Viewport({
        layout:'border',
        items:[
        {region:'north', html:'north', height:60},
        xtimer.org.tree,
        {region:'center', html:'center', title:'Case Details', split:true, items:[prepare]},
        {region:'south', html:'south', title:'south',height:100},
        {}],
    });



    // var project_1 = new Ext.tree.TreeNode({text:"project_1"});
    // root.appendChild(project_1);
    // project_1.expend();


});