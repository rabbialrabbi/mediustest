<template>
    <div class="col-md-12">
        <div class="panel panel-default group-posts header">
            <div>
                <h2 class="header-top">Recent Post sent to buffer</h2>
                <hr>
                <div class="header-search">
                    <div class="row">
                        <div class="col-3"><input type="text" name="search" placeholder="Search" v-model="searchKey" @keyup="routerLoad()"></div>
                        <Datepicker placeholder="Select Date" :input-class="inputDesign" @selected="dateSearch()" v-model="searchDate" tag="input"></Datepicker>
                        <div class="col-3">
                        <select @change="groupSearch(groupName)" v-model="groupName">
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
                groupName:'',
                searchKey:'',
                searchDate:'',
                state:{
                    data:''
                },
                inputDesign:'datepic'
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
                this.$router.push({path:'/history',query:{search:this.searchKey}})
            },
            groupSearch(data){
                this.$router.push({path:'/history',query:{groupName:this.data}})
            },
            dateSearch(){
                this.$router.push({path:'/history',query:{searchDate:this.searchDate}})
            }

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