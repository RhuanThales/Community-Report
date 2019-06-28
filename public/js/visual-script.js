//
$(document).ready(function(){
	$("#btnRegistrarOcorr").hide();
	$("#btnRegOcorrencia").show();
});

//Função para salvar os dados da ocorrência no banco do firebase
var selectedFile;

document.getElementById("upload").addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
	selectedFile = event.target.files[0];
	$("#btnRegistrarOcorr").show();
	$("#btnRegOcorrencia").hide();
};

//Variaveis usadas para criar um serial de números que servirão de id para cada objeto
var d = new Date();
var t = d.getTime();
var counter = t;

//Função para salvar os dados da ocorrências com a url da imagem selecionada e salvar a imagem no storege do firebase na pasta apropriada
function createOcorrenciaWithImage() {
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
		//Em caso de sucesso ao enviar a foto
		counter+=1;
		
		var downloadURL = uploadTask.snapshot.downloadURL;
		
		var ocorrencia = {
			regId: counter,
			imagemURL: downloadURL,
			regProblema: $("#selectProblema").val(),
			regEmail: $("#regEmail").val(),
			regRua: $("#regRua").val(),
			regNumero: $("#regNum").val(),
			regBairro: $("#regBairro").val(),
			regCidade: $("#regCidade").val(),
			regEstado: $("#regEstado").val(),
			regDescricao: $("#regDescricao").val(),
			regSetor: $("#regSetor").val(),
			regStatus: "Não Resolvido"
		}

		let db = firebase.database().ref("Ocorrencias/" + counter);
	
		db.set(ocorrencia).then(function(){
			window.alert("Sucesso no registro da ocorrencia!");
			window.open("../ocorrencias.html", "_self");
		});
	});
}