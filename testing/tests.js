QUnit.test( "Testing that the unit testing is working", function( assert ) {
  assert.ok( 1 == "1", "Unit testing is fully operational." );
});
asyncTest("Mongo GET Test", 1, function( assert ) {
	$.ajax({
		type: "GET",
		url: '../model/mongoScript.php',
		data: {},
		dataType: "JSON",
		success: function(data){
			//console.log(data);
			assert.ok(data.constructor === {}.constructor, "Returned object was JSON");
			start();
		},
		error: function(errorThrown){}
	});
});
QUnit.test( "Login Test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});