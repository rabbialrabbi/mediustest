<template>
    <div class="col-md-12">
        <div class="panel panel-default group-posts header">
            <div>
                <h2 class="header-top">Recent Post sent to buffer</h2>
                <hr>
                <div class="header-search">
                    <div class="row">
                        <div class="col-3"><input type="text" name="search" placeholder="Search" v-model="searchKey" @keyup="firstLoad()"></div>
                        <div class="col-3"><input type="text" name="search"></div>
                        <div class="col-3"><input type="text" name="search"></div>
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
                </div>
                <nav aria-label="Page navigation example justify-content-center">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        <li v-for="n in tableContent.last_page">
                            <a class="page-link" @click="firstLoad(n)">{{n}}</a>
                        </li>
                        <li class="page-item"><a class="page-link" @click="firstLoad(1)">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchComponent",
        data(){
            return {
                tableContent:{},
                searchKey:'',
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
                    this.tableContent = response.data

                })
            }

        },
        created() {
            this.firstLoad()
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
        input{
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


}
</style>