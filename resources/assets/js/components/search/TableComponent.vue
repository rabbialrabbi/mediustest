<template>
    <div class="content">
        <table class="table table-bordered" >
            <thead>
            <tr style="background-color: #dee2e6">
                <th style="width: 20%" >Group Name</th>
                <th style="width: 10%" class="text-center">Group Type</th>
                <th style="width: 10%" class="text-center">Account Name</th>
                <th style="width: 40%">Post Test</th>
                <th style="width: 20%" class="text-center">Time</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="content in tableContent.data">
                <td style="width: 20%" >{{content.group.name}}</td>
                <td style="width: 10%" class="text-center">{{content.group.type}}</td>
                <td style="width: 10%" class="text-center"><img :src="content.group.user.socialaccounts[0].avatar" :alt="content.group.name" height="40px" width="40px" style="border-radius: 50%"></td>
                <td style="width: 40%">{{content.text}}</td>
                <td style="width: 20%" class="text-center">{{content.created_at}}</td>
            </tr>
            </tbody>
        </table>

        <pagination :data="tableContent" :limit=20 @pagination-change-page="firstLoad">
            <span slot="prev-nav">&lt; Previous</span>
            <span slot="next-nav">Next &gt;</span>
        </pagination>
    </div>
</template>

<script>
    import Datepicker from "vuejs-datepicker";

    export default {
        name: "TableComponent",
        data(){
            return {
                tableContent:{},
                groupData:'',
                search:{
                    searchKey:this.$route.query.searchKey,
                    groupName:this.$route.query.groupName,
                    searchDate:this.$route.query.groupName,
                },
                inputDesign:'datepic'
            }
        },
        watch:{
            '$route'(to,from){
                this.searchKey = to.query.searchKey
                this.groupName = to.query.groupName
                this.searchDate = to.query.searchDate
                this.firstLoad()
            }
        },
        methods: {
            firstLoad(p = 1){
                axios.get('data',{
                    params: {
                        search: this.searchKey,
                        date:this.searchDate,
                        group:this.groupName,
                        page:p
                    }
                }).then((response)=>{
                    this.tableContent = response.data.info
                    this.groupData = response.data.gname


                })
            },


        },
        created() {
            this.firstLoad()
        },
        components:{
            Datepicker,
        }
    }
</script>

<style lang="scss" scoped>
    @import "./resources/assets/sass/bootstrap";
    tr td,th {
        color: #6F6F6F;

    }
    tr td:first-child {
        font-weight: bolder;
    }
</style>