<template>
  <div class="xen-data-table" :class="{ 'responsive': responsive, 'bordered': border, 'striped': striped, 'hover': hover }">
    <!--TABLE-->
    <div class="xen-data-table-container">
      <table>
        <thead>
          <tr>
            <th v-if="selection" class="xen-table-selection xen-select-all" >
              <xen-checkbox class="xen-color-primary" :value="selectAll" @click.native="toggleSelect()" @input="selectAll = $event" ref="selectAll"></xen-checkbox>
            </th>
            <th v-for="(column, index) in tableColumns" :class="{ 'xen-first-col': index === 0 }">
              <i class="material-icons xen-order-by" v-if="index !== 0"
                 v-bind:class="{ 'hidden': tableOrder !== column.key, 'descending': tableDirection === 1, 'ascending': tableDirection === -1}">
                arrow_downward
              </i>
              <span @click="orderBy(column.key);">{{ column.head }}</span>
              <i class="material-icons xen-order-by" v-if="index === 0"
                 v-bind:class="{ 'hidden': tableOrder !== column.key, 'descending': tableDirection === 1, 'ascending': tableDirection === -1}">
                arrow_downward
              </i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in filteredRows">
            <td v-if="selection" class="xen-table-selection">
              <xen-checkbox class="xen-color-primary xen-table-checkbox" :data-test="row[selectionKey]" :value="row[selectionKey]" @click.native="checkSelection()" @input="selectRow(row, selectionKey, $event)" ref="checkboxes"></xen-checkbox>
            </td>
            <td v-for="(column, index) in tableColumns" :data-title="[column.head]" :class="{ 'xen-first-col': index === 0, 'xen-editable': column.editable }" @click="editField($event, column.editable, row, column.key);">
              <span v-if="!column.options">{{row[column.key]}}</span>
              <div class="xen-column-options">
                <xen-select :dense="true" v-if="column.options" :value="row[column.key]" :options="column.options">{{row[column.key]}}</xen-select>
              </div>
              <i class="material-icons xen-table-edit-icon" v-if="column.editable">edit</i>
            </td>
          </tr>

          <tr v-if="filteredRows.length === 0">
            <td :colspan="columns.length" class="xen-results-message">
              {{ noResults }}
            </td>
          </tr>
        </tbody>
      </table>
      <transition name="fade">
        <div ref="editor" v-show="editing" class="xen-data-table-edit-container">
          <xen-input ref="editinput" :value="editValue" :focus="true" @keyup.native.enter="saveEdit(editValue)" @keyup.native.esc="cancelEdit()" @input="editValue = $event"></xen-input>
          <div class="xen-edit-buttons">
            <xen-button class="cancel" :primary="true" @click.native="cancelEdit()">cancel</xen-button>
            <xen-button class="save" :primary="true" @click.native="saveEdit(editValue)">save</xen-button>
          </div>
        </div>
      </transition>

      <div class="xen-table-edit-backdrop" v-if="editing" @click="cancelEdit()"></div>

    </div>
  </div>

</template>

<style lang="scss">
  @import './styles/data-tables';
</style>

<script>
  import XenButton from './Button'
  import XenCheckbox from './Checkbox.vue'
  import XenInput from './Input.vue'
  import XenSelect from './Select.vue'
  export default {

    // Components
    components: {
      XenButton,
      XenCheckbox,
      XenInput,
      XenSelect
    },

    // Props
    props: [
      'rows',
      'columns',
      'order',
      'direction',
      'filter',
      'count',
      'responsive',
      'border',
      'striped',
      'hover',
      'selection',
      'selectionKey',
      'options',
      'noResults'
    ],

    // Data
    data () {
      return {
        tableRows: this.rows || [],
        tableColumns: this.columns || [],
        tableOrder: this.order || '',
        tableDirection: this.direction || 1,
        selectAll: false,
        editing: false,
        editValue: '',
        editRow: undefined,
        editKey: undefined
      }
    },

    // Mounted
    mounted () {
      if (this.selection) {
        this.setSelection()
      }
    },

    // Methods
    methods: {
      orderBy (property) {
        if (this.tableOrder === property) {
          this.tableDirection = this.tableDirection * -1
        } else {
          this.tableDirection = 1
        }
        this.tableOrder = property
      },

      toggleSelect () {
        console.log('toggle select')
        this.$nextTick(() => {
          console.log(this.selectAll)
          this.tableRows.forEach((item, index) => {
            if (this.selectAll) {
              console.log(this.$refs.checkboxes[index])
              this.$refs.checkboxes[index].toggleCheckbox(true)
            } else {
              this.$refs.checkboxes[index].toggleCheckbox(false)
            }
          })
        })
        this.$emit('selected', this.tableRows)
      },

      checkSelection () {
        setTimeout(() => {
          var allSelected = true
          this.tableRows.forEach((item, index) => {
            if (!item[this.selectionKey]) {
              allSelected = false
            }
          })
          this.$refs.selectAll.toggleCheckbox(allSelected)
        }, 0)
      },

      setSelection () {
        this.tableRows.forEach((item, index) => {
          if (!item[this.selectionKey]) {
            item.selected = false
          }
        })
        this.tableRows = JSON.parse(JSON.stringify(this.tableRows))
      },

      selectRow (row, key, ev) {
        row[key] = ev
        this.$emit('selected', this.tableRows)
      },

      editField (ev, editable, row, key) {
        if (editable) {
          this.editRow = row
          this.editKey = key
          var target = ev.target.nodeName !== 'SPAN' && ev.target.nodeName !== 'I' ? ev.target : ev.target.offsetParent
          this.editing = !this.editing
          this.editValue = row[key]
          this.$refs.editor.style.left = target.offsetLeft + target.clientWidth - 216 + 'px'
          this.$refs.editor.style.top = target.offsetTop + target.offsetParent.offsetTop + 'px'
          var input = this.$refs.editinput.$el.getElementsByTagName('input')[0]
          this.$nextTick(() => {
            input.focus()
          })
        }
      },

      cancelEdit () {
        this.editing = false
      },

      saveEdit (value) {
        this.editing = false
        this.editRow[this.editKey] = value
      }
    },

    // Computed
    computed: {
      filteredRows: function () {
        if (this.filter) {
          return this.tableRows.filter((row) => {
            return row.name.toLowerCase().indexOf(this.filter) >= 0
          })
          .sort((a, b) => {
            a[this.tableOrder] < b[this.tableOrder] ? -1 : 1
          })
        } else {
          if (this.tableOrder) {
            console.log('order -', this.tableOrder)
            return this.tableRows.sort((a, b) => {
              return a[this.tableOrder] < b[this.tableOrder] ? -1 * this.tableDirection : 1 * this.tableDirection
            })
          } else {
            return this.tableRows
          }
        }
      }
    }

  }
</script>
