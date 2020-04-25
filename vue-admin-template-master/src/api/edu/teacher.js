import request from '@/utils/request'

export default {
    // 1.讲师列表(条件查询分页)
    getTeacherListPage(current, limit, teacherQuery) {
        return request({
           // url: '/eduservice/teacher/pageTeacherCondition/${current}/${limit}',
           url: '/eduservice/teacher/pageTeacherCondition/' + current + "/" + limit,
            method: 'post',
            //data表示把对象转换为json传递到后台接口
            data: teacherQuery
        })
    }
}
// export function getTeacherListPage(current,limit,teacherQuery) {
//     return request({
//         url: '/eduservice/teacher/pageTeacherCondition/${current}/${limit}',
//         method: 'post',
//         //data表示把对象转换为json传递到后台接口
//         data:teacherQuery
//     })
//   }