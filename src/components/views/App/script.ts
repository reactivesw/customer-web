import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import TheHeader from 'src/components/frame/TheHeader'
import TheFooter from 'src/components/frame/TheFooter'
import * as categoriesType from 'src/infrastructure/store/categories_types'

export default {
  name: 'app',

  computed: mapGetters({
    featureCategory: categoriesType.GET_FEATURE_CATEGORY
  }),

  methods: {
    ...mapActions({
      fetchCategories: categoriesType.FETCH_CATEGORIES
    })
  },

  created(this: Component) {
    this['fetchCategories']()
  },

  watch: {
    featureCategory (this: Component, featureCategory) {
      if (featureCategory) {
        this['$router'].replace({
          name: 'category',
          params: {
            catid: this['featureCategory'].id
          }
        })
      }
    }
  },

  components: {
    TheHeader,
    TheFooter
  }
}
