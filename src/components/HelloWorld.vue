<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
const count = ref(0)

//
// What to take away from this:
//   - If you need access to a function/method:
//     - Only in the template:
//       - Use: globalProperties
//       - OR : Provide/Inject
//     - In setup (or/and the template):
//       - Add an object on globalProperties with the function/method
//


//
// Why this exists:
//
//    When trying to figure out how to add global state/functionality to an
//    application, it may be tempting to look at the Plugin documentation and
//    believe you can attach functions/methods to globalProperties.
//    You can...BUT. You can not use those functions/methods in script setup.
//
//    It took me longer than it should have to figure that out. I eventually
//    found this issue that describes the nature of this in more detail:
//    - https://github.com/vuejs/core/issues/4403
//
//    Therefore...
//
//    There are limitations to the scope of how you can use globalProperties.
//    I have put this together to demonstrate those limitations, including
//    some things you might be tempted to try, like using 'this.' in your
//    script setup.
//
//    Finally, while this is called "vue-plugin-exceptions", it is more
//    specifically related to the scope limitations of globalProperties.
//
//    I've chosen to keep the name relating to plugins, as this is where I
//    encountered it, and it also tests the issue in the context of plugins
//    as well.
//


//------------------------------------------------------------------------------
// these will not work. uncomment to test.
// console.log('setup     : globalProperty        : '
//             +$translate('greetings.hello'));
// console.log('setup     : this.globalProperty   : '
//             +this.$translate('greetings.hello'));

// these will work:
const i18n = inject('i18n')
console.log('setup     : Provide/Inject        : '+i18n.departures.hello);

// these will work:
const pcwm = inject('pcwm')
console.log('setup     : ppcwm.someVar         : '+pcwm.someVar);
console.log('setup     : pcwm.ShowSomeVar()    : '+pcwm.ShowSomeVar());
console.log('setup     : pcwm.ShowSomeVar(str) : '
            +pcwm.ShowSomeVar('pcwm.ShowSomeVar()'));

// these will not work. uncomment to test:
// console.log('setup     : $pcwmNoVar   : '+this.$pcwmNoVar);
// console.log('setup     : $pcwmNoVar   : '+this.$pcwmNoVar());
// console.log('setup     : $pcwmWithVar : '+this.$pcwmWithVar('$pcwmWithVar'));
// console.log('setup     : $pcwmNoVar   : '+$pcwmNoVar);
// console.log('setup     : $pcwmNoVar   : '+$pcwmNoVar());
// console.log('setup     : $pcwmWithVar : '+$pcwmWithVar('$pcwmWithVar'));

//------------------------------------------------------------------------------
onMounted(() =>
{
	// these will not work. uncomment to test.
	// console.log('onMounted : $translate      : '
	//             +$translate('greetings.hello'));
	// console.log('onMounted : this.$translate : '
	//             +$this.$translate('greetings.hello'));

	// these will not work. uncomment to test:
	// console.log('onMounted : $pcwmNoVar   : '+this.$pcwmNoVar);
	// console.log('onMounted : $pcwmNoVar   : '+this.$pcwmNoVar());
	// console.log('onMounted : $pcwmWithVar : '+this.$pcwmWithVar('$pcwmWithVar'));
	// console.log('onMounted : $pcwmNoVar   : '+$pcwmNoVar);
	// console.log('onMounted : $pcwmNoVar   : '+$pcwmNoVar());
	// console.log('onMounted : $pcwmWithVar : '+$pcwmWithVar('$pcwmWithVar'));

	// these will work:
	console.log('onMounted : pcwm.someVar          : '+pcwm.someVar);
	console.log('onMounted : pcwm.ShowSomeVar()    : '+pcwm.ShowSomeVar());
	console.log('onMounted : pcwm.ShowSomeVar()    : '
	            +pcwm.ShowSomeVar('pcwm.ShowSomeVar()'));
})

//------------------------------------------------------------------------------
const computedVars = computed(() => {
	// these will not work. uncomment to test.
	// console.log('computed  : $translate      : '
	//             +$translate('greetings.hello'));
	// console.log('computed  : this.$translate : '
	//             +$this.$translate('greetings.hello'));

	// console.log('computed  : globalProperties   : '
	//             +$translate('greetings.hello'));
	// console.log('computed  : Provide/Inject     : '
	//             +i18n.departures.goodbye);

	// these will not work. uncomment to test:
	// console.log('computed  : $pcwmNoVar   : '+this.$pcwmNoVar);
	// console.log('computed  : $pcwmNoVar   : '+this.$pcwmNoVar());
	// console.log('computed  : $pcwmWithVar : '+this.$pcwmWithVar('$pcwmWithVar'));
	// console.log('computed  : $pcwmNoVar   : '+$pcwmNoVar);
	// console.log('computed  : $pcwmNoVar   : '+$pcwmNoVar());
	// console.log('computed  : $pcwmWithVar : '+$pcwmWithVar('$pcwmWithVar'));

	// these will work:
	console.log('computed  : pcwm.someVar          : '+pcwm.someVar);
	console.log('computed  : pcwm.ShowSomeVar()    : '+pcwm.ShowSomeVar());
	console.log('computed  : pcwm.ShowSomeVar()    : '
	            +pcwm.ShowSomeVar('pcwm.ShowSomeVar()'));
	return '';
})
//------------------------------------------------------------------------------
</script>

<template>

	<h1 class="h1">Via globalProperties: {{ $translate('greetings.hello') }}</h1>
	<h1 class="h1">Via Provide/Inject: {{ i18n.departures.goodbye }}</h1>

	<h1 class="h1">Via Provide/Inject class property: {{ pcwm.someVar }}</h1>
	<h1 class="h1">Via Provide/Inject class method(): {{ pcwm.ShowSomeVar() }}</h1>

	<h1 class="h1">Via computed (will not work): {{ computedVars }}</h1>

</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
