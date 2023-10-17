<template>
    <div>
        <!-- 文件选择输入框 -->
        <input type="file" ref="fileInput" @change="handleFileChange_new" multiple>

        <button @click="addImage">添加图片</button>
        <div class="image-container">
            <div v-for="(image, index) in imageUrls" :key="index" class="image-item">
                <img :src="image.url" alt="上传的图片" />
                <button class="delete-button" @click="removeImage(index)">删除</button>
            </div>
        </div>

        <!-- 触发上传按钮 -->
        <button @click="uploadImages">上传图片</button>

    </div>
</template>
  
<script>
export default {
    props: ['childData'],
    data() {
        return {
            //图片的集合
            imageUrls: [],
            //需要删除的图片
            deleteImagesUrls: [],
            //原有的图片
            OriginalPhotos: [],
        };
    },
    mounted() {
        console.log('imageUrls[0]',this.childData.imageUrls[0])
        this.imageUrls.push(this.childData.imageUrls[0])
    },
    methods: {
        handleFileChange_new() {
            // 通过文件选择输入框获取用户选择的文件
            const selectedFiles = this.$refs.fileInput.files;

            // 使用FileReader读取图片并将其存储在images数组中
            for (let i = 0; i < selectedFiles.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageUrls.push({ url: e.target.result, type: 'new' });
                };
                reader.readAsDataURL(selectedFiles[i]);
            }
        },
        addImage() {
            // 在这里可以通过某个方法获取新的图片URL并添加到集合中
            const newImageUrl = "http://image-upload-and-management.oss-cn-beijing.aliyuncs.com/wallhaven-3zvypv.jpg";
            // 举例一个新URL
            this.OriginalPhotos.push(
                {
                    url: newImageUrl,
                    type: 'old',
                    oss_url: newImageUrl.substring(newImageUrl.lastIndexOf('/') + 1)
                });
            console.log('OriginalPhotos', this.OriginalPhotos)
            for (let index = 0; index < this.OriginalPhotos.length; index++) {
                const photos = this.OriginalPhotos[index];
                this.loadImageAsBase64(photos.url)
                    .then((base64String) => {
                        // console.log(base64String);
                        const imageUrl = "data:image/jpeg;base64," + base64String;
                        this.imageUrls.push({ url: imageUrl, type: 'old', oss_url: photos.oss_url });
                    })
                    .catch((error) => {
                        console.error(error);
                    });

            }
            this.OriginalPhotos = [];


        },
        removeImage(index) {
            if (this.imageUrls[index].type == 'old') {
                this.deleteImagesUrls.push(this.imageUrls[index]);
            }
            this.imageUrls.splice(index, 1);
        },
        async uploadImages() {
            this.deleteImage();
            for (let i = 0; i < this.imageUrls.length; i++) {
                const image = this.imageUrls[i];
                if (image.type == 'old') {
                    continue;
                }

                const formData = new FormData();
                formData.append('file', this.dataURLtoFile(image.url, `image${i}.png`));
                try {
                    const response = await fetch('http://localhost:80/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        // 上传成功，可以在这里处理成功的逻辑
                        console.log('图片上传成功');
                        const responseBody = await response.text(); // 或者使用 response.json() 或 response.blob()
                        console.log('响应主体内容:', responseBody);
                        this.imageUrls[i].oss_url = responseBody;
                    } else {
                        // 上传失败，可以在这里处理失败的逻辑
                        console.log(response)
                        console.log('图片上传失败');
                    }
                } catch (error) {
                    console.error('上传时出错', error);
                }
            }

            this.sendImgCollection();
        },
        async deleteImage() {
            for (let i = 0; i < this.deleteImagesUrls.length; i++) {
                const image = this.deleteImagesUrls[i];
                const formData = new FormData();
                formData.append('deleteImagesUrl', image.oss_url);
                try {
                    const response = await fetch('http://localhost:80/delete', {
                        method: 'delete',
                        body: formData,
                    });

                    if (response.ok) {
                        // 上传成功，可以在这里处理成功的逻辑
                        console.log('图片删除成功');
                        const responseBody = await response.text(); // 或者使用 response.json() 或 response.blob()
                        console.log('响应主体内容:', responseBody);
                        this.deleteImagesUrls = [];
                    } else {
                        // 上传失败，可以在这里处理失败的逻辑
                        console.log(response)
                        console.log('图片删除失败');
                    }
                } catch (error) {
                    console.error('图片删除时出错', error);
                }
            }

        },
        dataURLtoFile(dataURL, fileName) {
            const arr = dataURL.split(',');
            // 匹配以冒号（:）开头、分号（;）结尾的文本片段
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], fileName, { type: mime });
        },
        loadImageAsBase64(url) {
            return new Promise((resolve, reject) => {
                fetch(url)
                    .then(response => response.blob())
                    .then(blob => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            resolve(reader.result.split(',')[1]);
                        };
                        reader.readAsDataURL(blob);
                    })
                    .catch(error => {
                        reject(new Error('Failed to load image'));
                    });
            });
        },
        //发送总共的集合
        sendImgCollection() {
            const collection = [];

            for (let index = 0; index < this.imageUrls.length; index++) {
                const image = this.imageUrls[index].oss_url;
                collection.push(image)
            }

            fetch('http://localhost:80/imageList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(collection),
            })
                .then(response => {
                    if (response.ok) {
                        // 请求成功，可以在这里处理成功的逻辑
                        console.log('集合发送成功');
                    } else {
                        // 请求失败，可以在这里处理失败的逻辑
                        console.log('集合发送失败');
                    }
                })
                .catch(error => {
                    // 请求过程中发生错误，可以在这里处理错误
                    console.log('请求发生错误:', error);
                });
        },
        //测试组件间通信
        testImg(){
            console.log('testIMg')
        }, 
        //清除图片的集合
        clearImgSet(){
             //图片的集合
            this.imageUrls= [],
            //需要删除的图片
            this.deleteImagesUrls= [],
            //原有的图片
            this.OriginalPhotos=[]
        },

    },
};
</script>
<style scoped>
.image-container {
    display: flex;
    flex-wrap: wrap;
}

.image-item {
    margin: 10px;
    display: inline-block;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    background-color: #f9f9f9;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    /* 添加相对定位 */
}

.image-item img {
    max-width: 100%;
    max-height: 200px;
    margin-bottom: 10px;
}

.delete-button {
    background-color: #ff5555;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    position: absolute;
    /* 添加绝对定位 */
    top: 10px;
    /* 距离顶部的距离 */
    right: 10px;
    /* 距离右侧的距离 */
    opacity: 0;
    /* 初始时隐藏按钮 */
}

.image-item:hover .delete-button {
    opacity: 1;
    /* 鼠标悬停时显示按钮 */
}
</style>
  
  