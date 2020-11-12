import 'jquery'
import '../style/clippy.css'
import './clippy'
import '../style/minireset.min.css'
import '../style/main.css'
import './formhandler'

clippy.load('Rover', function (agent) {
	// Do anything with the loaded agent
	agent.show();
});
