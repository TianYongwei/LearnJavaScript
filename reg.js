// 先弹窗才能获取 modal-dialog
if(document.querySelector('.modal-dialog')) {

    /**
     * 变量声明
     */
    var dialog = '';
    
    var anyou = '';
    var title = '';
    var type = '';
    var content = '';
    var number = '';
    var shenfen = '';
    var beigao = '';
    var beigaoLocation = '';
    var province = '';
    var bank = '';
    var money = '';
    var hejie = '';
    var shenpanzhang = '';
    var shenpanyuan = '';
    var time = '';
    var year = '';
    var link = '';

    var error = '无法匹配';



    // 文书类型
    type = document.getElementsByClassName('form-group margin-t-1x')[0].querySelector("div:nth-child(3)").innerText;
    console.log("/*=============================================*/")
    console.log('/*===========文书类型：'+type+'==============*/')
    console.log("/*=============================================*/\n\n\n")

     // 案由
    if(document.querySelector('.modal-dialog').innerText.match(/侵犯.*权/)) {
        anyou = document.querySelector('.modal-dialog').innerText.match(/侵犯.*权/)[0].replace('侵犯','');
        // console.log("案由：" + anyou)
    } else if(document.querySelector('.modal-dialog').innerText.match(/.{2}权/)) {
        anyou = document.querySelector('.modal-dialog').innerText.match(/.{2}权/)[0];
        // console.log("案由：" + anyou)
    } else {
        anyou = error;
    }
     
     // 标题
     if(document.querySelector('.decision-title').innerText) {
        title = document.querySelector('.decision-title').innerText;
        // console.log("标题：" + title)
     } else {
        anyou = error
     }
     
     // 文书类别
     var shen = ''
     if(document.querySelector('.modal-dialog').innerText.match(/初.*号/)) {
        shen = '一审'
     } else if(document.querySelector('.modal-dialog').innerText.match(/终.*号/)) {
        shen = '二审'
     } else {
         shen = '??'
     } 
     type = shen + type;
     
     // 内容
     if(document.querySelector('.modal-dialog .modal-body').innerText) {
         content = document.querySelector('.modal-dialog .modal-body').innerText
         content.replace(/，/g,'')
     } else {
         content = error;
     }

    // 案号
    if(document.getElementsByClassName('form-group margin-t-1x')[0].querySelector("div:nth-child(4)")) {
        number = document.getElementsByClassName('form-group margin-t-1x')[0].querySelector("div:nth-child(4)").innerText;
    } else {
        number = error;
    }
    //  if(document.querySelector('.modal-dialog').innerText.match(/初.*号/)) {
    //     number = document.querySelector('.modal-dialog .modal-body').innerText.match(/^（.*初.*号/)[0]
    //  } else if(document.querySelector('.modal-dialog').innerText.match(/终.*号/)) {
    //     number = document.querySelector('.modal-dialog .modal-body').innerText.match(/（.*终.*号/)[0]
    //  } else {
    //     number = error;
    //  }
     
     // 涉案身份
     if(document.querySelector('.modal-dialog').innerText.match(/初.*号/) && document.querySelector('.modal-dialog').innerText.match(/原告北京鸟人艺术推广有限责任公司/)) {
        //  "涉案身份：" + "一审原告"
        shenfen = '一审原告'

        //  "被告：" + document.querySelector('.modal-dialog').innerText.match(/被告.*，/)[0].replace('被告','').replace('，','')
        //  "被告：" + document.querySelector('.modal-dialog').innerText.match(/被告.*。/)[0].match(/住所地.*。/)[0].replace('住所地','').replace('。','')
        beigao = document.querySelector('.modal-dialog').innerText.match(/被告.*?，/)[0].replace('被告','').replace('，','')
        beigaoLocation = document.querySelector('.modal-dialog').innerText.match(/被告.*?。/)[0].match(/住所地.*?。/)[0].replace('住所地','').replace('。','')
     } else if(document.querySelector('.modal-dialog').innerText.match(/初.*号/) && document.querySelector('.modal-dialog').innerText.match(/被告北京鸟人艺术推广有限责任公司/)) {
        //  "涉案身份：" + "一审被告"
        shenfen = '一审被告'
     } else if(document.querySelector('.modal-dialog').innerText.match(/终.*号/) && document.querySelector('.modal-dialog').innerText.match(/原告北京鸟人艺术推广有限责任公司/)) {
        //  "涉案身份：" + "二审原告"
        shenfen = '二审原告'
        // "被告：" + document.querySelector('.modal-dialog').innerText.match(/被告.*，/)[0].replace('被告','').replace('，','')
        // "被告：" + document.querySelector('.modal-dialog').innerText.match(/被告.*。/)[0].match(/住所地.*。/)[0].replace('住所地','').replace('。','')
        beigao = document.querySelector('.modal-dialog').innerText.match(/被告.*?，/)[0].replace('被告','').replace('，','')
        beigaoLocation = document.querySelector('.modal-dialog').innerText.match(/被告.*?。/)[0].match(/住所地.*?。/)[0].replace('住所地','').replace('。','')
     } else if(document.querySelector('.modal-dialog').innerText.match(/终.*号/) && document.querySelector('.modal-dialog').innerText.match(/被告北京鸟人艺术推广有限责任公司/)) {
        //  "涉案身份：" + "二审被告"
        shenfen = '二审被告'
     } else if(document.querySelector('.modal-dialog').innerText.match(/终.*号/) && document.querySelector('.modal-dialog').innerText.match(/上诉人（原审原告）北京鸟人艺术推广有限责任公司/)) {
        //  "涉案身份：" + "二审上诉人"
        shenfen = '二审上诉人（原审原告）'
        // "被告：" + document.querySelector('.modal-dialog').innerText.match(/被告.*，/)[0].replace('被告','').replace('，','')
        // "被告：" + document.querySelector('.modal-dialog').innerText.match(/被告.*。/)[0].match(/住所地.*。/)[0].replace('住所地','').replace('。','')
        beigao = document.querySelector('.modal-dialog').innerText.match(/被上诉人（原审被告）.*?，/)[0].replace('被上诉人（原审被告）','').replace('，','')
        beigaoLocation = document.querySelector('.modal-dialog').innerText.match(/被上诉人（原审被告）.*?。/)[0].match(/住所地.*?。/)[0].replace('住所地','').replace('。','')
     } else {
        shenfen = error
        beigao = error
        beigaoLocation = error
     }

     // 省份
     if(document.querySelector('.modal-dialog').innerText.match(/.*法院/)[0].match(/.*市/)) {
        province = document.querySelector('.modal-dialog').innerText.match(/.*法院/)[0].match(/.*市/)[0]
     } else if(document.querySelector('.modal-dialog').innerText.match(/.*法院/)[0].match(/.*省/)) {
        province = document.querySelector('.modal-dialog').innerText.match(/.*法院/)[0].match(/.*省/)[0]
     } else {
        province = error
     }

     // 判决款项开户信息
     if(document.querySelector('.modal-dialog').innerText.match(/开户行.*/)) {
         bank = document.querySelector('.modal-dialog').innerText.match(/开户行.*/)[0]
     } else {
         bank = error
     }

     // 赔偿金额
     if(document.querySelector('.modal-dialog').innerText.match(/共计\d*元/)) {
        money = document.querySelector('.modal-dialog').innerText.match(/共计\d*元/)[0].replace('共计','')
     } else if(document.querySelector('.modal-dialog').innerText.match(/人民币\d*元/)) {
        money = document.querySelector('.modal-dialog').innerText.match(/人民币\d*元/)[0].replace('人民币','')
     } else {
        money = error
     }

     // 是否和解
     if(document.querySelector('.modal-dialog .modal-body').innerText.match(/撤回起诉/)
      || document.querySelector('.modal-dialog .modal-body').innerText.match(/撤诉/)
      || document.querySelector('.modal-dialog .modal-body').innerText.match(/和解/)) {
        hejie = "是"
     } else {
        hejie = "否"
     }

     // 审判长
     if(document.querySelector('.modal-dialog .modal-body').innerText.match(/审 判 长/)) {
         var name = document.querySelector('.modal-dialog .modal-body').innerText.match(/审 判 长.*/)[0];
         name = name.replace('审 判 长', '');
         name = name.replace('　　','')
         if(name.match(/代理/)) {
             name = name.replace('代理','')
         }
         shenpanzhang = name
     } else if(document.querySelector('.modal-dialog .modal-body').innerText.match(/审判长/)) {
         var name = document.querySelector('.modal-dialog .modal-body').innerText.match(/审判长.*/)[0];
         name = name.replace('审判长', '');
         name = name.replace('　　','')
         if(name.match(/代理/)) {
             name = name.replace('代理','')
         }
         shenpanzhang = name
     } else {
         shenpanzhang = error
     }
     // 审判员
     if(document.querySelector('.modal-dialog .modal-body').innerText.match(/审 判 员/)) {
         var names = document.querySelector('.modal-dialog .modal-body').innerText.match(/审 判 员.*/g);
         var multiName = ''
         names.forEach(name => {
             name = name.replace('审 判 员', '');
             name = name.replace('　　','')
             if(name.match(/代理/)) {
                 name = name.replace('代理','')
             }
             multiName += (name + '-')
            //  console.log("审判员：" + name)
         });
         shenpanyuan = multiName
     } else if(document.querySelector('.modal-dialog .modal-body').innerText.match(/审判员/)) {
        var names = document.querySelector('.modal-dialog .modal-body').innerText.match(/审判员.*/g);
        var multiName = ''
        names.forEach(name => {
            name = name.replace('审判员', '');
            name = name.replace('　　','')
            if(name.match(/代理/)) {
                name = name.replace('代理','')
            }
            multiName += (name + '-')
           //  console.log("审判员：" + name)
        });
        shenpanyuan = multiName
    } else {
         shenpanyuan = error
     }
     // 判决时间
     if(document.querySelector('.modal-dialog .modal-body').innerText.match(/二.*年.*日/)) {
        //  console.log("判决时间：" + document.querySelector('.modal-dialog .modal-body').innerText.match(/二O.*/)[0])
        time = document.querySelector('.modal-dialog .modal-body').innerText.match(/二.*年.*日/)[0]
     } else {
        //  console.log("判决时间：" + "未能匹配，请手动获取！")
        time = error
     }

     // 判决年度
     if(document.querySelector('.modal-dialog .modal-body').innerText.match(/二.*年/)) {
        //  console.log("判决年度：" + document.querySelector('.modal-dialog .modal-body').innerText.match(/二O.*年/)[0])
        year = document.querySelector('.modal-dialog .modal-body').innerText.match(/二.*年/)[0]
     } else {
        //  console.log("判决年度：" + "未能匹配，请手动获取！")
        year = error
     }

     // 启信宝链接（按页）
    link = window.location.href

    if(anyou == error) {
        console.error("案由：" + anyou)
    }
    
    console.log("案由：" + anyou)
    console.log("标题：" + title)
    console.log("文书类别：" + type)
    // console.log("内容：" + content)
    console.log("案号：" + number)
    console.log("涉案身份：" + shenfen)
    console.log("被告：" + beigao)
    console.log("被告所在地：" + beigaoLocation)
    console.log("省份：" + province)
    console.log("判决款项：" + bank)
    console.log("赔偿金额：" + money)
    console.log("是否和解：" + hejie)
    console.log("审判长：" + shenpanzhang)
    console.log("审判员：" + shenpanyuan)
    console.log("判决时间：" + time)
    console.log("判决年度：" + year)
    console.log("链接：" + link)
    console.log("内容：" + content)

    // console.log("案由,标题,文书类别,内容,案号,涉案身份,被告,被告所在地,省份,判决款项,赔偿金额,是否和解,审判长,审判员,判决时间,判决年度,链接")
    console.log("案由,标题,文书类别,案号,涉案身份,被告,被告所在地,省份,判决款项,赔偿金额,是否和解,审判长,审判员,判决时间,判决年度\n" + anyou + ',' 
        + title + ',' 
        + type + ',' 
        // + content + ',' 
        + number + ',' 
        + shenfen + ',' 
        + beigao + ',' 
        + beigaoLocation + ',' 
        + province + ',' 
        + bank + ',' 
        + money + ',' 
        + hejie + ',' 
        + shenpanzhang + ',' 
        + shenpanyuan + ',' 
        + time + ',' 
        + year)

} else {
    alert("请先点击选择一个文书！")
}
