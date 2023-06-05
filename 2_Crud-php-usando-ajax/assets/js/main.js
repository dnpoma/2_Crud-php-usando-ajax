	$(document).ready(function(){
		// recuperar datos de la tabla clientes..
	   	function loadTableData(){
	       $.ajax({
	           url : "ver.php",
	           type : "POST",
	           success:function(data){
	              $("#tableData").html(data);
	           }
	       });
	   	}
	   	loadTableData();
		$("#registro").click(function(e){
			e.preventDefault();
			var nombre = $("#nombre").val();
			var cedula = $("#cedula").val();
			var email = $("#email").val();
			var pais = $("#pais").val();
			var pwd = $("#pwd").val();
			if(nombre !=="" && cedula !=="" && email !=="" && pais !=="" && pwd !==""){
				$.ajax({
					url : "accion.php",
					type: "POST",
					cache: false,
					data : {nombre:nombre, cedula:cedula, email:email, pais:pais, pwd:pwd},
					success:function(data){
						alert("Datos insertados correctamente");
						$("#clienteForm")[0].reset();
						loadTableData();
					},
				});
			}else{
				alert("Todos los campos son obligatorios");
			}
		});	

		// Eliminar registro a MySql desde PHP usando jQuery AJAX
		$(document).on("click",".borrar-btn",function(){
			if (confirm("¿Estás seguro de eliminar esto?")) {
				var id = $(this).data('id');
				var element = this;
				$.ajax({
					url :"borrar.php",
					type:"POST",
					cache:false,
					data:{borrarId:id},
					success:function(data){
						if (data == 1) {
							$(element).closest("tr").fadeOut();
							alert("Registro de usuario eliminado correctamente");	
						}else{
							alert("Identificación de usuario inválida");
						}
					}
				});
			}
		});

		// Edite el registro a mysqli desde php usando jquery ajax
		$(document).on("click",".editar-btn",function(){
			var id = $(this).data('id');
			$.ajax({
				url :"extraer.php",
				type:"POST",
				cache:false,
				data:{editarId:id},
				success:function(data){
					$("#editarForm").html(data);
				},
			});
		});

		// User record update to mysqli from php using jquery ajax
		$(document).on("click","#editarSubmit", function(){
			var editar_id = $("#editarId").val();
			var nombre = $("#editarNombre").val();
			var cedula = $("#editarCedula").val();
			var email = $("#editarEmail").val();
			var pais = $("#editarPais").val();
			var password = $("#editarPassword").val();
			
			$.ajax({
				url:"actualizar.php",
				type:"POST",
				cache:false,
				data:{editar_id:editar_id, nombre:nombre, cedula:cedula, email:email, pais:pais, password:password},
				success:function(data){
					if (data ==1) {
						alert("Registro de usuario actualizado correctamente");
						loadTableData();
					}else{
						alert("Algo salió mal");	
					}
				}
			});
		});
	});


function validar() {
	var cad = document.getElementById("cedula").value.trim();
	var total = 0;
	var longitud = cad.length;
	var longcheck = longitud - 1;

	if (cad !== "" && longitud === 10){
		for(var i = 0; i < longcheck; i++){
			if (i%2 === 0) {
				var aux = cad.charAt(i) * 2;
				if (aux > 9) aux -= 9;
					total += aux;
				} else {
					total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
				}
		}

		total = total % 10 ? 10 - total % 10 : 0;

		if (cad.charAt(longitud-1) == total) {
			document.getElementById("salida").innerHTML = ("Cedula Válida");
		}else{
			document.getElementById("salida").innerHTML = ("Cedula Inválida");
		}
	}
}


function buscar_datos(consulta){
	$.ajax({
		url: '../../ver.php',
		type: 'POST',
		dataType: 'html',
		data: {consulta: consulta},
	})
	.done(function(respuesta){
	$("#datos").html(respuesta);
	})
	.fail(function(){
		window.alert("error");
	})
}


$(document).on('keyup', '#caja_busqueda', function(){
	var valor = $(this).val();
	if(valor != ""){
		buscar_datos(valor);
	}else{
		buscar_datos();
	}
})