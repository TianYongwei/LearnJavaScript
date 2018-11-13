// 先弹窗才能获取 modal-dialog
if(document.querySelector('.modal-dialog')) {

    /**
     * 变量声明
     */
    
    var error = '无法匹配';
    var anyou = error;
    var title = error;
    var type = error;
    var content = error;
    var number = error;
    var shenfen = error;
    var beigao = error;
    var beigaoLocation = error;
    var province = error;
    var bank = error;
    var money = error;
    var hejie = error;
    var shenpanzhang = error;
    var shenpanyuan = error;
    var time = error;
    var year = error;
    var link = error;
    var fayuan = error;


    var dialog = document.querySelector('.modal-dialog').innerText;
    var dialog_body = document.querySelector('.modal-dialog .modal-body').innerText;

    // 文书类型
    // type = document.getElementsByClassName('form-group margin-t-1x')[0].querySelector("div:nth-child(3)").innerText;

    if(dialog.match(/民 事 判 决 书/)) {
        type = '民 事 判 决 书'
    } else if(dialog.match(/民 事 裁 定 书/)) {
        type = '民 事 裁 定 书'
    } else if(dialog.match(/执 行 裁 定 书/)) {
        type = '执 行 裁 定 书'
    } else if(dialog.match(/民 事 调 解 书/)) {
        type = '民 事 调 解 书'
    }
    console.log("/*=============================================*/")
    console.log('/*===========文书类型：'+type+'==============*/')
    console.log("/*=============================================*/\n\n\n")

    // 法院
    fayuan = document.getElementsByClassName('form-group margin-t-1x')[0].querySelector("div").innerText.match(/.*?法院/)[0]

     // 案由
     if(dialog.match(/的.*?权/)) {
        anyou = dialog.match(/的.*?权/)[0].replace('的','');
    } else if(dialog.match(/侵犯了.*?权/)) {
        anyou = dialog.match(/侵犯了.*?权/)[0].replace('侵犯了','');
    } else if(dialog.match(/侵害了.*?权/)) {
        anyou = dialog.match(/侵害了.*?权/)[0].replace('侵害了','');
    } else if(dialog.match(/侵犯.*?权/)) {
        anyou = dialog.match(/侵犯.*?权/)[0].replace('侵犯','');
        // console.log("案由：" + anyou)
    } else if(dialog.match(/侵害.*?权/)) {
        anyou = dialog.match(/侵害.*?权/)[0].replace('侵害','');
        // console.log("案由：" + anyou)
    } else if(dialog.match(/.{2}权/)) {
        anyou = dialog.match(/.{2}权/)[0];
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

     // 案号
    // if(document.getElementsByClassName('form-group margin-t-1x')[0].querySelector("div:nth-child(4)")) {
    //     number = document.getElementsByClassName('form-group margin-t-1x')[0].querySelector("div:nth-child(4)").innerText;
    // } else {
    //     number = error;
    // }
     if(dialog_body.match(/（.*?初.*?号/)) {
        number = dialog_body.match(/（.*?初.*?号/)[0]
     } else if(dialog_body.match(/（.*?终.*?号/)) {
        number = dialog_body.match(/（.*?终.*?号/)[0]
     } else {
        number = error;
     }
     
     // 文书类别
     var shen = ''
     if(number != error && number.match(/初.*号/)) {
        shen = '一审'
     } else if(number != error && number.match(/终.*号/)) {
        shen = '二审'
     } else {
         shen = '??'
     } 
     type = shen + type;
     
     // 内容
     if(dialog_body) {
         content = dialog_body
         content = content.replace(/，/g, '')
         content = content.replace(/\n/g, '')
     }

     
     // 涉案身份
     if(shen == '一审' && dialog.match(/原告北京鸟人艺术推广有限责任公司/)) {
        shenfen = '一审原告'
        if(dialog.match(/被告.*?住所/)) {
            beigao = dialog.match(/被告.*?，/)[0].replace('被告','').replace('，','')
        } else {
            beigao = dialog.match(/被告.*?。/)[0].replace('被告','').replace('。','')
        }
        if(dialog.match(/被告.*?。/)[0].match(/住所地.*?。/)) {
            beigaoLocation = dialog.match(/被告.*?。/)[0].match(/住所地.*?。/)[0].replace('住所地','').replace('。','')
        }
     } else if(shen == '一审' && dialog.match(/被告北京鸟人艺术推广有限责任公司/)) {
        shenfen = '一审被告'
        if(dialog.match(/原告.*?住所/)) {
            beigao = dialog.match(/原告.*?，/)[0].replace('原告','').replace('，','')
        } else {
            beigao = dialog.match(/原告.*?。/)[0].replace('原告','').replace('。','')
        }
        
        if(dialog.match(/原告.*?。/)[0].match(/住所地.*?。/)) {
            beigaoLocation = dialog.match(/原告.*?。/)[0].match(/住所地.*?。/)[0].replace('住所地','').replace('。','')
        }
     } else if(shen == '二审' && dialog.match(/原告北京鸟人艺术推广有限责任公司/)) {
        shenfen = '二审原告'
        beigao = dialog.match(/被告.*?，/)[0].replace('被告','').replace('，','')
        if(dialog.match(/被告.*?。/)[0].match(/住所地.*?。/)) {
            beigaoLocation = dialog.match(/被告.*?。/)[0].match(/住所地.*?。/)[0].replace('住所地','').replace('。','')
        }
     } else if(shen == '二审'  && dialog.match(/被告北京鸟人艺术推广有限责任公司/)) {
        shenfen = '二审被告'
        beigao = dialog.match(/原告.*?，/)[0].replace('原告','').replace('，','')
        if(dialog.match(/原告.*?。/)[0].match(/住所地.*?。/)) {
            beigaoLocation = dialog.match(/原告.*?。/)[0].match(/住所地.*?。/)[0].replace('住所地','').replace('。','')
        }
     } else if(shen == '二审' && dialog.match(/被上诉人（原审原告）北京鸟人艺术推广有限责任公司/)) {
        // 1
        shenfen = '二审被上诉人（原审原告）'
        beigao = dialog.match(/上诉人（原审被告）.*?，/)[0].replace('上诉人（原审被告）','').replace('，','')
        if(dialog.match(/上诉人（原审被告）.*?。/)[0].match(/住所地.*?。/)) {
            beigaoLocation = dialog.match(/上诉人（原审被告）.*?。/)[0].match(/住所地.*?。/)[0].replace('住所地','').replace('。','')
        }
     } else if(shen == '二审' && dialog.match(/被上诉人（原审被告）北京鸟人艺术推广有限责任公司/)) {
        // 2
        shenfen = '二审被上诉人（原审被告）'
        beigao = dialog.match(/上诉人（原审原告）.*?，/)[0].replace('上诉人（原审原告）','').replace('，','')
        if(dialog.match(/上诉人（原审原告）.*?。/)[0].match(/住所地.*?。/)) {
            beigaoLocation = dialog.match(/上诉人（原审原告）.*?。/)[0].match(/住所地.*?。/)[0].replace('住所地','').replace('。','')
        }
     } else if(shen == '二审' && dialog.match(/上诉人（原审原告）北京鸟人艺术推广有限责任公司/)) {
        // 3
        shenfen = '二审上诉人（原审原告）'
        beigao = dialog.match(/被上诉人（原审被告）.*?，/)[0].replace('被上诉人（原审被告）','').replace('，','')
        if(dialog.match(/被上诉人（原审被告）.*?。/)[0].match(/住所地.*?。/)) {
            beigaoLocation = dialog.match(/被上诉人（原审被告）.*?。/)[0].match(/住所地.*?。/)[0].replace('住所地','').replace('。','')
        }
     } else if(shen == '二审' && dialog.match(/上诉人（原审原告）北京鸟人艺术推广有限责任公司/)) {
        // 4
        shenfen = '二审上诉人（原审被告）'
        beigao = dialog.match(/被上诉人（原审原告）.*?，/)[0].replace('被上诉人（原审原告）','').replace('，','')
        if(dialog.match(/被上诉人（原审原告）.*?。/)[0].match(/住所地.*?。/)) {
            beigaoLocation = dialog.match(/被上诉人（原审原告）.*?。/)[0].match(/住所地.*?。/)[0].replace('住所地','').replace('。','')
        }
     }

     // 省份
     if(dialog.match(/.*法院/)[0].match(/.*市/)) {
        province = dialog.match(/.*法院/)[0].match(/.*市/)[0]
     } else if(dialog.match(/.*法院/)[0].match(/.*省/)) {
        province = dialog.match(/.*法院/)[0].match(/.*省/)[0]
     }

     // 判决款项开户信息
     if(dialog.match(/开户行.*/)) {
         bank = dialog.match(/开户行.*/)[0]
     }

     // 赔偿金额
     if(dialog.match(/共计\d*元/)) {
        money = dialog.match(/共计\d*元/)[0].replace('共计','')
     } else if(dialog.match(/人民币\d*元/)) {
        money = dialog.match(/人民币\d*元/)[0].replace('人民币','')
     }

     // 是否和解
     if(dialog_body.match(/撤回起诉/)
      || dialog_body.match(/撤诉/)
      || dialog_body.match(/和解/)) {
        hejie = "是"
     }

     // 审判长
     if(dialog_body.match(/审.*?判.*?长/)) {
         var name = dialog_body.match(/审.*?判.*?长.*/)[0];
         name = name.replace(/审.*?判.*?长/, '');
        //  name = name.replace('　　','')
         if(name.match(/代理/)) {
             name = name.replace('代理','')
         }
         shenpanzhang = name
     } else if(dialog_body.match(/审判长/)) {
         var name = dialog_body.match(/审判长.*/)[0];
         name = name.replace('审判长', '');
         name = name.replace('　　','')
         if(name.match(/代理/)) {
             name = name.replace('代理','')
         }
         shenpanzhang = name
     }
     // 审判员
     if(dialog_body.match(/审.*?判.*?员/)) {
         var names = dialog_body.match(/审.*?判.*?员.*/g);
         var multiName = ''
         names.forEach(name => {
             name = name.replace('审.*?判.*?员', '');
            //  name = name.replace('　　','')
             if(name.match(/代理/)) {
                 name = name.replace('代理','')
             }
             multiName += (name + '-')
            //  console.log("审判员：" + name)
         });
         shenpanyuan = multiName
     } else if(dialog_body.match(/审判员/)) {
        var names = dialog_body.match(/审判员.*/g);
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
    }
     // 判决时间
     if(dialog_body.match(/二Ｏ.{3}年.*?日/)) {
        time = dialog_body.match(/二Ｏ.{3}年.*?日/)[0]
     } else if(dialog_body.match(/二.{3}年.*?日/)) {
        time = dialog_body.match(/二.{3}年.*?日/)[0]
     }

     // 判决年度
     if(dialog_body.match(/二Ｏ.{3}年/)) {
        year = dialog_body.match(/二Ｏ.{3}年/)[0]
     } else if(dialog_body.match(/二.{3}年/)) {
        year = dialog_body.match(/二.{3}年/)[0]
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
    console.log("链接：" + link + "\n\n\n")
    // console.log("内容：" + content + "\n\n\n\n")

    console.error('↓↓↓↓↓↓↓↓↓↓↓↓↓↓拷贝下面的内容↓↓↓↓↓↓↓↓↓↓↓')
    // console.log("案由,标题,文书类别,内容,案号,涉案身份,被告,被告所在地,省份,判决款项,赔偿金额,是否和解,审判长,审判员,判决时间,判决年度,链接")
    console.log("案由,标题,文书类别,案号,涉案身份,被告,被告所在地,省份,判决款项,赔偿金额,是否和解,法院,审判长,审判员,判决时间,判决年度,正文\n\n\n\n" + anyou + ',' 
        + title + ',' 
        + type + ',' 
        + number + ',' 
        + shenfen + ',' 
        + beigao + ',' 
        + beigaoLocation + ',' 
        + province + ',' 
        + bank + ',' 
        + money + ',' 
        + hejie + ',' 
        + fayuan + ',' 
        + shenpanzhang + ',' 
        + shenpanyuan + ',' 
        + time + ',' 
        + year + ',' 
        + content)

} else {
    alert("请先点击选择一个文书！")
}
