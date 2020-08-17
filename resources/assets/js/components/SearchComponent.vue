<template>
    <div class="col-md-12">
        <div class="panel panel-default group-posts header">
            <div>
                <h2 class="header-top">Recent Post sent to buffer</h2>
                <hr>
                <div class="header-search">
                    <div class="row">
                        <div class="col-3"><input type="text" name="search" placeholder="Search" v-model="searchKey" @keyup="firstLoad()"></div>
                        <Datepicker placeholder="Select Date" :input-class="inputDesign" @selected="firstLoad" v-model="state.data" tag="input"></Datepicker>
                        <div class="col-3"><select name="" id="">
                            <option value="">All Group</option>
                            <option v-for="g in groupData" value="">{{g.type}}</option>
                        </select></div>
                    </div>
                </div>
                <div class="content">
                    <table class="table table-bordered" >
                        <thead>
                        <tr style="background-color: #dee2e6">
                            <th>Group Name</th>
                            <th>Group Type</th>
                            <th>Account Name</th>
                            <th>Post Test</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="content in tableContent.data">
                            <td >{{content.group.name}}</td>
                            <td >{{content.group.type}}</td>
                            <td class="text-center"><img :src="content.group.user.socialaccounts[0].avatar" :alt="content.group.name" height="40px" width="40px" style="border-radius: 50%"></td>
                            <td style="width: 400px">{{content.text}}</td>
                            <td>{{content.created_at}}</td>
                        </tr>
                        </tbody>
                    </table>

                    <pagination :data="tableContent" :limit=20 show-disabled=true @pagination-change-page="firstLoad">
                        <span slot="prev-nav">&lt; Previous</span>
                        <span slot="next-nav">Next &gt;</span>
                    </pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    export default {
        name: "SearchComponent",
        data(){
            return {
                tableContent:{},
                groupData:'',
                searchKey:'',
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
            }

        },
        created() {
            this.firstLoad()
        },
        components:{
            Datepicker
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