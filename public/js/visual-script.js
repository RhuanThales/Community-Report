//Função para redirecionar a pagina de registro de ocorrencias
$(document).ready(function(){
	$("#occorDiv").show();
	$("#regDiv").hide();
	$("#menuDiv").show();
	$("#returnArrow").show();
	$("#backArrow").hide();
	$("#btnRegistrarOcorr").hide();
	$("#btnRegOcorrencia").show();
});

var btnRegAnimal = document.getElementById('btnRegAnimal');
var btnRegArvore = document.getElementById('btnRegArvore');
var btnRegBuraco = document.getElementById('btnRegBuraco');
var btnRegInseto = document.getElementById('btnRegInseto');
var btnRegLampada = document.getElementById('btnRegLampada');
var btnRegLimpeza = document.getElementById('btnRegLimpeza');
var btnRegLote = document.getElementById('btnRegLote');
var btnRegBarulho = document.getElementById('btnRegBarulho');
var btnRegSinal = document.getElementById('btnRegSinal');
var btnRegAgua = document.getElementById('btnRegAgua');
var btnRegOutros = document.getElementById('btnRegOutros');
var btnBackArrow = document.getElementById('backArrow');

btnRegAnimal.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").show();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegArvore.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").show();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegBuraco.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").show();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegInseto.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").show();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegLampada.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").show();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegLimpeza.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").show();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegLote.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").show();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegBarulho.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").show();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegSinal.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").show();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegAgua.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").show();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegOutros.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#probLabel").hide();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").hide();
	$("#descCompleta").show();
	$("#descLabelS").hide();
});

//Função para salvar os dados da ocorrência no banco do firebase
var selectedFile;

document.getElementById("upload").addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
	selectedFile = event.target.files[0];
	$("#btnRegistrarOcorr").show();
	$("#btnRegOcorrencia").hide();
};

//Função para salvar os dados da ocorrências com a url da imagem selecionada e salvar a imagem no storege do firebase na pasta apropriada
function regOcorrencia() {
	//Criando uma referencia ao root
	var filename = selectedFile.name;
	var storageRef = firebase.storage().ref('/fotos-ocorrencias/' + filename);
	var uploadTask = storageRef.put(selectedFile);

	uploadTask.on('state_changed', function(snapshot){

	},function(error){
		//Em caso de der algum erro ao enviar os dados
		var errorCode = error.code;
		var errorMessage = error.message;
		window.alert("Error: " + errorMessage);
	
	},function(){
		//Em caso de sucesso ao enviar os dados
		var postKey = firebase.database().ref('Ocorrencias-Registradas/').push().key;
		var downloadURL = uploadTask.snapshot.downloadURL;
		var updates = {};
		var postData = {
			imagemURL: downloadURL,
			regProblema1: $("#selectAnimal").val(),
			regProblema2: $("#selectArvore").val(),
			regProblema3: $("#selectBuraco").val(),
			regProblema4: $("#selectLampada").val(),
			regProblema5: $("#selectLimpeza").val(),
			regProblema6: $("#selectLote").val(),
			regProblema7: $("#selectInseto").val(),
			regProblema8: $("#selectBarulho").val(),
			regProblema9: $("#selectSinal").val(),
			regProblema0: $("#selectAgua").val(),
			regEmail: $("#regEmail").val(),
			regRua: $("#regRua").val(),
			regNumero: $("#regNum").val(),
			regBairro: $("#regBairro").val(),
			regCidade: $("#regCidade").val(),
			regEstado: $("#regEstado").val(),
			regDescricaoS: $("#descSimples").val(),
			regDescricaoC: $("#descCompleta").val(),
			regSetor: "Ouvidoria",
			regStatus: "Não Resolvido"
		};
		updates['/Ocorrencias-Registradas/' + postKey] = postData;
		firebase.database().ref().update(updates);
		//Apos salvar os dados o formulario de preenchimento é ocultado
		window.alert("Sucesso no registro da ocorrencia!!!");
		window.open("ocorrencias.html", "_self");
	});
}

//Função que salva a ocorrência registrada, sem colocar foto, no banco de dados
function regOcorr(){
	var postKey = firebase.database().ref('Ocorrencias-Registradas/').push().key;
	var updates = {};
	var postData = {
		regProblema1: $("#selectAnimal").val(),
		regProblema2: $("#selectArvore").val(),
		regProblema3: $("#selectBuraco").val(),
		regProblema4: $("#selectLampada").val(),
		regProblema5: $("#selectLimpeza").val(),
		regProblema6: $("#selectLote").val(),
		regProblema7: $("#selectInseto").val(),
		regProblema8: $("#selectBarulho").val(),
		regProblema9: $("#selectSinal").val(),
		regProblema0: $("#selectAgua").val(),
		regEmail: $("#regEmail").val(),
		regRua: $("#regRua").val(),
		regNumero: $("#regNum").val(),
		regBairro: $("#regBairro").val(),
		regCidade: $("#regCidade").val(),
		regEstado: $("#regEstado").val(),
		regDescricaoS: $("#descSimples").val(),
		regDescricaoC: $("#descCompleta").val(),
		regSetor: "Ouvidoria",
		regStatus: "Não Resolvido"
	};
	updates['/Ocorrencias-Registradas/' + postKey] = postData;
	firebase.database().ref().update(updates);
	//Apos salvar os dados o formulario de preenchimento é ocultado
	window.alert("Sucesso no registro da ocorrencia!!!");
	window.open("ocorrencias.html", "_self");
}