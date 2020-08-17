<template>
    <div class="col-md-12">
        <div class="panel panel-default group-posts header">
            <div>
                <h1 class="header-top">Recent Post sent to buffer</h1>
                <hr>
                <div class="header-search">
                    <div class="row">
                        <div class="col-3"><input type="text" name="search" placeholder="Search" v-model="search.searchKey" @keyup="routerLoad()"></div>
                        <Datepicker placeholder="Select Date"
                                    :input-class="inputDesign"
                                    @selected="search.searchDate = $event"
                                    v-model="state"
                                    >

                        </Datepicker>
                        <div class="col-3">
                        <select @change="routerLoad()" v-model="search.groupName">
                            <option value="">All Group</option>
                            <option  v-for="g in groupData" :value="g.type" >{{g.type}}</option>
                        </select></div>
                    </div>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import TableComponent from "./search/TableComponent";
    export default {
        name: "SearchComponent",
        data(){
            return {
                tableContent:{},
                groupData:'',
                search:{
                    searchKey:'',
                    groupName:'',
                    searchDate:'',
                },
                state:'',
                inputDesign:'datepic'
            }
        },
        watch:{
            state:function(value){
                let moment = value.toString()
                let time = new Date(moment)
                let year = time.getFullYear().toString()+'-'
                let month = (time.getMonth()+1).toString()+'-'
                let day = time.getDate()
                this.search.searchDate = year.concat(month,day)

                this.routerLoad()
            }
        },
        methods: {
            firstLoad(p = 1){
                axios.get('data',{
                    params: {
                        key: this.searchKey,
                        page:p
                    }
                }).then((response)=>{
                    this.tableContent = response.data.info
                    this.groupData = response.data.gname


                })
            },
            routerLoad(){
                this.$router.push({path:'/history',query:this.search})
            },

        },
        created() {
            this.firstLoad()
        },
        components:{
            Datepicker,
            TableComponent
        }
    }
</script>

<style lang="scss" scoped>
    @import "./resources/assets/sass/bootstrap";
.header{
    padding: 10px;

    &-top{
        color: black;
        font-weight: bolder;
        padding: 20px;
    }
    &-search{
        padding: 30px;
        input,select{
            width: 250px;
            border: none;
            border-bottom: 1px solid darkgray;
            padding: 10px;
            outline: none;
        }
        input:hover{
            outline: none;
        }
    }
    select{
        transform: translateY(10%);
        margin-left: 60px;
    }

}
</style>