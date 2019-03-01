/**
 * 功能：公共JS文件
 * 日期：2018-1-10
 **/

function Album() {
    const album = ['../img/img-1.jpg','../img/img-2.jpg','../img/img-3.jpg','../img/img-4.jpg'];
    // 载入图片
    this.loadImage = function(ident) {
        const albumUl = document.getElementById(ident);
        const album_length = album.length;
        let album_li = '';
        for(let i = 0; i < album_length; i++) {
            album_li += `
                <li>
                    <img src=${album[i]}>
                </li>
            `;
        }
        albumUl.innerHTML = album_li;
    }
}

module.exports = new Album();



