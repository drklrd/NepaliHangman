
module.exports = function(router){
	
	router.get('/',function(req,res){
		res.render('layout');
	});

	router.get('/templates/:template',function(req,res){
		res.render(req.params.template);
	});

	

}