<template>
  <div class="group-container">
    <div class="final-group-teacher">
      <div class="instructions">
        <p>
          <strong>
            请先设定分组数、分组方式和分组类型并开始分组，对分组结果微调后请更新分组。
          </strong>
        </p>
      </div>
      <div class="group-settings">
        <mu-raised-button @click="dialog=true" secondary icon="group" class="upload-group-count" label="开始分组"/>
        <mu-raised-button @click="uploadGroups" :disabled="!groups.length" primary icon="update" label="更新分组"/>
          <mu-flat-button href="/admin/download?filename=FinalGroup" icon="file_download" secondary label="导出分组表"/>

        <br>
      </div>
      <div class="deleted-students">
        <h3>
        <mu-icon value="delete_forever" :size="32"/>
        无答辩资格学生</h3>
        <div ref="deleted"></div>
      </div>
      <div class="groups-wrapper">
        <div class="group" name="group" v-for="(group,index) of groups" @drop="drop($event)" @dragover="allowDrop($event)" :id="'g'+group._id">
          <div class="teachers-grouped" :id="'tg'+group._id">
            <span class="teacher-to chip no-selection" v-for="teacher of group.mentors" draggable="true" @dragstart="drag($event)" :id="'t'+teacher._id">
                  {{teacher.name}}
            </span>
          </div>
          <div class="students-grouped" :id="'sg'+group._id">
            <span class="student-to chip no-selection" v-for="student of group.students" draggable="true" @dragstart="drag($event)" :id="'s'+student._id">
                    {{student._id}}{{student.name}}
                    <span @click="deleteItem(student._id)" class="delete-item">
                    <mu-icon value="clear" :size="16"/>
                    </span>
                </span>
          </div>
          <span class="group-id no-selection" :id="'p'+group._id">{{group._id}}</span>
        </div>
      </div>
      
      <div class="overlap" v-if="isOverlap">
        <div class="progress">
        <p><strong>{{warningMsg}}</strong></p>
          <mu-circular-progress :size="120" color="red"/>
        </div>
      </div>
       <mu-dialog :open="dialog" title="请选择作为组长（中心点）的导师" @close="dialog=false">
        <div>
        <div class="centroids-checkbox-wrapper">
        <span class="chip" v-for="teacher of teachers">
          <mu-checkbox name="centroids" :nativeValue="teacher._id" v-model="centroids" :label="teacher.name" class="centroids-checkbox"/> 
        </span>
        </div>
        <mu-raised-button slot="actions" backgroundColor="lightBlue" @click="beginGroup" label="确认"/>
       </div>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
      return {
        status: 0,
        groupCount: 6,
        isTab: false,
        dialog: false,
        isOverlap: false,
        groupMethod: true,
        manual:0,
        groupProc: '',
        warningMsg:'请稍等，正在后台处理中...',
        teachers:[],
        centroids:[],
        groups: []
      }
    },
    methods: {
      drop($event) {
        $event.preventDefault() //阻止默认事件，防止页面跳转
        if ($event.target.id[0] !== 'g') //如果拖拽到非div则不接受
          return
        let elId = $event.dataTransfer.getData("elId") //被拖拽元素id和name
          ,
          elName = $event.dataTransfer.getData("elName") //
          ,
          id = $event.target.id.substring(1) //group id
        if (elId[0] === 's')
          document.querySelector('#sg' + id).appendChild(document.getElementById(elId))
        if (elId[0] === 't')
          document.querySelector('#tg' + id).appendChild(document.getElementById(elId))
      },
      drag($event) {
        //获取被拖拽元素的id 也就是绑定的帐号id
        $event.dataTransfer.setData("elId", $event.target.id)
          //获取用户姓名 用于传递
        $event.dataTransfer.setData("elName", $event.target.innerHTML.trim())
      },
      allowDrop($event) {
        $event.preventDefault()
      },
      deleteItem(id) {
        this.$refs.deleted.append(document.getElementById('s' + id))
      },
      beginGroup() { 
        this.dialog=false
            new Promise((resolve, reject) => {
              this.isOverlap = true
              this.POST('/admin/finalGroup', { 
                centroids: this.centroids
              }).then(res => {
                  this.groups = res.data
                  resolve()
                })
                .catch(err=>{
              this.warningMsg = '无法连接到服务器，请重试'
              window.setTimeout(()=>{
                this.isOverlap = false
              },1000)
            })
            })
            .then(() => {
              this.warningMsg = '请稍等，正在后台处理中...'
              this.isOverlap = false
            })
      },
      uploadGroups() {
        new Promise((resolve, reject) => {
            this.isOverlap = true
            let group = document.getElementsByName('group'),
              groups = []
            if (!group)
              return
            _.forEach(group, (g, index) => {
              groups[index] = {
                _id: 0,
                mentors: [],
                students: []
              }
              _.forEach(g.childNodes, (c) => {
                if (c.nodeName === 'SPAN') {
                  groups[index]._id = _.parseInt(c.id.substring(1))
                }
                if (c.nodeName === 'DIV') {
                  if (c.id[0] === 't') {
                    _.forEach(c.childNodes, (teacher) => {
                      groups[index].mentors.push(teacher.id.substring(1))
                    })
                  }
                  if (c.id[0] === 's') {
                    _.forEach(c.childNodes, (student) => {
                      groups[index].students.push(student.id.substring(1))
                    })
                  }
                }
              })
            })
            this.POST('/admin/admUpFTchGroups', groups)
              .then(res => {
                if (res.data.state === 1) {
                  console.log('%c 上传分组完成', 'background:#3f51b5;color:#fff')
                }
              })
              .catch(err => {
                console.log(err)
              })
            resolve(groups)
          })
          .then((g) => {
            this.isOverlap = false
          })
      }
    },
    mounted(){
      this.GET('/admin/getTchGroupList')
        .then(res=>{
          if (res.data.state===1) {
            this.teachers=res.data.teachers
          }else{
           alert('获取导师列表失败') 
          }
          //每组可以添加附加信息
        })
    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.wyvonj-tooltip{
  border-radius: 3px;
  background-color: #f44336;
  font-size: 14px;
  color: white;
  text-align: center;
}
.group-current-status
{
    width: 196px;
    margin: 16px 0;
    padding: 12px;
}
.instructions
{
    font-size: 20px;

    padding-bottom: 14px;
}
.deleted-students{
  margin: 16px;
  padding: 16px;
  border: 1px dashed #f44336;
  >div{
    display: flex;
    flex-wrap: wrap;
  }
  h3{
    color: #f44336;
    display: flex;
    align-items: center;
  }

}
.final-group-teacher
{
    width: 100%;
    padding: 16px 8px;
    .group-settings
    {
        padding-left: 16px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .add-button,.minus-button
        {
            color: #333;
            border: 1px solid #aaa;
            border-radius: 0;
            background-color: #fff;
            &:hover
            {
                background-color: #e7e7e7;
            }
        }
        .add-button
        {
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
        }
        .minus-button
        {
            border-left: none;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
                margin-right: 32px;
        }
        .upload-group-count
        {
            margin-left: 16px;

            border-radius: 3px;
            vertical-align: bottom;
        }
    }
}

.teachers-grouped
{
    padding: 8px;

    border-bottom: 1px dashed #d6d6d6;
}
.students-grouped
{
    padding: 8px;
}
.delete-item{
    font-family: arial;
    display: flex;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    color: #f44336;
    align-items: center;
    cursor: pointer;
    position: relative;
    top: 1px;
    right: -6px;
    transition:$material-enter;
    &:hover{
      color:white;
      background-color: #f44336;
    }
}
.groups-wrapper
{
    display: flex;

    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.group
{
    position: relative;

    display: block;
    min-width: 320px;
    min-height: 64px;
    margin: 16px;
    padding-right: 96px;
    transition: $material-enter;
    flex-wrap: wrap;
    align-items: flex-start;
    border: 1px solid rgba(0,0,0,.1);
    &::after
    {
        position: absolute;
        top: 0;
        right: 0;

        width: 92px;
        height: 100%;
        padding-top: 24px;
        padding-left: 8px;
        content: '\62D6\62FD\5230\8FD9\91CC';

        border-left: 1px dashed #d6d6d6;
        background-color: rgba(227, 225, 225, .18);
    }
    &:hover
    {
    box-shadow: 0px 0px 20px 0px #cacaca;
    }
    span.group-id
    {
        font-size: 18px;

        position: absolute;
        top: -12px;
        right: -12px;

        width: 24px;
        height: 24px;
        padding-left: 7px;

        color: white;
        border-radius: 12px;
        background-color: $red;
        z-index: 3;
    }
}
.group-length
{
  display:inline-block;
    font-size: 20px;
    line-height: 34px;

    min-width: 40px;
    height: 38px;
    margin-right: 16px;

    text-align: center;

    border: 1px solid #aaa;
    border-radius: 3px;
}
a{
    display: inline-flex;
    border-radius: 1px;
  }
.teachers-grouped
{
    display: flex;
}
.chip:hover{
  cursor: move;
}
.chip .mu-icon{
  top: 0;
}
.overlap
{
    position: fixed;
    z-index: 200;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;

    width: 100vw;
    height: 100vh;

    background-color: rgba(0,0,0,.5);

    align-items: center;
    justify-content: center;
    .progress
    {
        font-size: 20px;

        width: 320px;
        height: 320px;
        padding-top: 60px;

        text-align: center;

        border-radius: 4px;
        background-color: #fff;
        .mu-circular-progress
        {
            margin-top: 24px;
        }
    }
}


</style>