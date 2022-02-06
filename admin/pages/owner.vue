<template>
  <main>
      <div class="container-fluid c-section">
          <div class="row">
      <div class="col-sm-3"></div>
          <div class=col-sm-6>
              <div class="a-spacing-top-medium"></div>
                  <h2>Add a new owner</h2>
                  <form>
                      <!--name-->
                      <div class="a-spacing-top-medium">
                          <label>Name</label>
                        <input class="a-input-text" style="width:100%" v-model="name"/>
                  </div>
                   <!--about-->
                      <div class="a-spacing-top-medium">
                          <label>About</label>
                        <input class="a-input-text" style="width:100%" v-model="about"/>
                  </div>
                  <!--photo-->
                   <div class="a-spacing-top-medium">
                              <label style="margin-bottom:0px;">Add Photo</label>
                              <div class="a-row-spacing-top-medium">
                                  <label class="choosefile-button">
                                      <i class="fal fa-plus"> </i>
                                      <input type="file" @change="onFileSelected"/>
                                      <p style="margin-top: -70px">{{fileName}}</p>
                                  </label>
                              </div>
                              </div>
                  <!---button-->
                              <hr/>
                              <div class="a-spacing-top-large">
                                  <span class="a-button-register">
                                      <span class="a-button-inner">
                                      <span lass="a-button-text" @click="onAddowner">Add owner</span>
                                      </span>
                                  </span>
                          </div>
                  </form>
                  <br/>
                  <ul >
                      <li v-for="owner in owners" :key="owner.name" class="list-group-item">{{owner.name}}</li>
                  </ul>
              </div>
              <div class="col-sm-3"></div>
          </div>
      </div>
  </main>
</template>

<script>
export default {    
    async asyncData({ $axios }){
            try{
                debugger
                let response= await $axios.$get("http://localhost:4000/api/owners")
                return{
                    owners:response.owners
                }
            }catch(err){
                console.log(err)
            }
    },

    data(){
        return{
            name:"",
            about:"",
            fileName:"",
            selectedFile:null,
        }
    },
    methods:{
        async onAddowner(){
            try{
                let data = new FormData();
                data.append("name",this.name)
                data.append("about",this.about)
                data.append("photo",this.selectedFile,this.selectedFile.name)
                let response= await this.$axios.$post("http://localhost:4000/api/owners",data)
                    this.owners.push({name:this.name})
            }catch(err){
                console.log(err)
            }
            
        },
         onFileSelected(event){
            this.selectedFile=event.target.files[0];
            this.fileName=event.target.files[0].name
            },
    }

}
</script>

<style>

</style>