import { provide } from "vue";


//------------------------------------------------------------------------------
class ProvideInjectClassWithMethod {
	someVar = 123;
	ShowSomeVar(str:string = '') {
		if (0 === str.length) {
			return this.someVar;
		} else {
			return str;
		}
	}
};


//------------------------------------------------------------------------------
class TestPluginClass
{
	Pcwm:object;

  //------------------------------------------------------------
	constructor() {
		this.Pcwm = new ProvideInjectClassWithMethod;
	}

  //------------------------------------------------------------
  install(app:any, options:any) {

    //----------------------------------
    app.provide('i18n', options);

    app.config.globalProperties.$translate = (key) => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }

    //----------------------------------
    app.provide('pcwm', this.Pcwm);

    app.config.globalProperties.$pcwmNoVar = () => {
    	return this.Pcwm.ShowSomeVar('$pcwmNoVar');
    }
    app.config.globalProperties.$pcwmWithVar = (str:string) => {
    	return this.Pcwm.ShowSomeVar(str);
    }
  }
};


//------------------------------------------------------------------------------
const TestPlugin = new TestPluginClass();
export default TestPlugin;
