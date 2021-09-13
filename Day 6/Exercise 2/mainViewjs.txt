sap.ui.jsview("mickey.view.Main", {

	getControllerName: function() {
		return "mickey.controller.Main";
	},
	createContent: function(oController) {
		//oInp is a UI5 object not an HTML Object
		//@Runtime UI5 Renderer will produce the HTML
		var form = new sap.ui.layout.form.SimpleForm({
			title: "User Details",
			content: [


				new sap.m.Label({

					text: "User Name:"

				}),

				new sap.m.Input("idUser", {

					type: sap.m.InputType.Text,

					placeholder: "Enter a Name..."

				}),

				new sap.m.Label({

					text: "Password:"

				}),

				new sap.m.Input("idPassword", {

					type: sap.m.InputType.Password,

					placeholder: "Password"

				}),
				new sap.m.Button("idBtn", {
					text: "Click me",
					icon: "sap-icon://program-triangles",
					press: [oController.onLogin, oController]
				})

			]

		});

		return [form];

	}

});