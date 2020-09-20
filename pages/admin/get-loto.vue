<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Get Lottery
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="3">
                <v-select
                  v-model="model"
                  append-icon="mdi-plus"
                  :items="areas"
                >
                  <v-icon slot="append" color="green">mdi-plus</v-icon>
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span
                      v-if="index === 1"
                      class="grey--text caption"
                    >(+{{ model.length - 1 }} others)</span>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="7">
                <v-row>
                  <v-col cols="6">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="formatDateFrom"
                          label="From"
                          v-bind="attrs"
                          v-on="on"
                          prepend-icon="mdi-event"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="dateFrom" no-title @input="menu = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="formatDateTo"
                          label="To"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="dateTo" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="2" style="display: flex; align-items: center;">
                <v-btn @click="getLoto" color="error">Save Loto</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
        areas: ['Miền Bắc', 'Miền Nam', 'Miền Trung'],
        model: 'Miền Bắc',
        dateFrom: new Date().toISOString().substr(0, 10),
        dateTo: new Date().toISOString().substr(0, 10),
        menu: false,
        menu1: false,
    }
  },
  sockets: {
    connect: function() {
      console.log('socket connected')
    }
  },
  computed: {
    formatDateFrom() {
      const [year, month, day] = this.dateFrom.split('-')
      return `${day}/${month}/${year}`
    },
    formatDateTo() {
      const [year, month, day] = this.dateTo.split('-')
      return `${day}/${month}/${year}`
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    getLoto () {
      const mapArea = { 'Miền Bắc': 'xsmb', 'Miền Nam': 'xsmn', 'Miền Trung': 'xsmt' }
      const area = mapArea[this.model]

      const from = this.formatDate(this.dateFrom)
      const to = this.formatDate(this.dateTo)
      const base = window.location.protocol + '//' + window.location.host + '/api/craw'
      const getUrl = `${base}?area=${area}&from=${from}&to=${to}`
      this.$axios.$get(getUrl).then(res => {
        console.log(res)
      }).catch (err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>

</style>