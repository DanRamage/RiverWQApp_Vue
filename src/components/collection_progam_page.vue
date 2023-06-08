<template>
  <div :id="popup_id" class="modal bacteria-modal-active">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ collection_program_name }}</h5>
          <button type="button" @click="$emit('close-collection-modal')" class="btn-close"><span >&times;</span></button>

        </div>

        <div class="modal-body montserat-font">
          <p>
            {{collection_program_description}}
          </p>
          <p>
            For more information, go <a :href="collection_program_url" target="new">here</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import DataAPI from "../utilities/rest_api";

  export default {
    name: 'CollectionProgramModal',
    props: {
      'program_type': {type: String, default: ""},
      'popup_id': {type: String, default: "collection_program_modal"},
    },
    data() {
      return {
        collection_program_info: undefined
      }
    },
    components: {
    },
    mounted() {
      let vm = this;
      console.debug("CollectionProgramModal mounted.")

      DataAPI.GetWaterQualityProgramInfo(this.$store.state.site_name, this.program_type)
          .then(program_info_rec => {
            vm.collection_program_info = program_info_rec;
          })
    },
    methods: {
    },
    computed: {
      collection_program_name: function () {
        let name = '';
        if (this.collection_program_info !== undefined) {
          name = this.collection_program_info.program_name;
        }
        return(name);
      },
      collection_program_description: function() {
        let desc = '';
        if (this.collection_program_info !== undefined) {
          desc = this.collection_program_info.description;
        }
        return(desc);
      },
      collection_program_url: function() {
        let url = '';
        if (this.collection_program_info !== undefined) {
          url = this.collection_program_info.url;
        }
        return(url);
      }

    }
  }
</script>

<style scoped>
.bacteria-modal-active{
  display:block;
}

</style>
