var conn = new Ext.data.Connection(
	{
		autoAbort:false,
		disableCaching:false,
		method:'POST',
		useDefaultXhrHeader:false,
		extraParams:{
			action:1,
			project_id:1,
			case_id:1
		},
		url:'http://127.0.0.1:5000/taskmanage'
	});

function test () {
	conn.request(
		{
		success:function(response){var res = Ext.util.JSON.decode(response.responseText.trim()); update_case(res)},
		failure:function(){alert("f");}
	});	// body...
}