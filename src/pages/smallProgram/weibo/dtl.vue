<template>
	<view></view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { mapState } from 'vuex'
	@Component({})
	export default class Index extends Vue {
		dtlParams: string = ''
		mounted () {
			this.getData(this.$store.state.weibo.toDtlParams)
		}
		getData (params) {
			this.$store.dispatch('weibo/hot/searchDtl', params)
		}
	}
</script>

<style>
</style>
