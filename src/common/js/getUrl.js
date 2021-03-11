import axios from "axios";

export function getPlayUrl(list) {
    // console.log(list)
    let data = ''
    let midArr = []
    list.forEach((item, index) => {
        midArr.push(item.mid)
    })
    midArr = midArr.toString()
     data =  axios.get(`/song/urls?id=${midArr}`).then(res => {
        // console.log(res.data)
        list.forEach((item, index) => {
             console.log(res.data.data[item.mid])
            if (res.data.data[item.mid]) {
                item.url = res.data.data[item.mid]
                // console.log(item)
            }else{
                item.url = ''
            }
        })
        list = list.filter(function (x) {
            return x.url != ''
        })
        // console.log('list',list)
        return list
    })
    return data

}