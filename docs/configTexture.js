/*******************生成立方体纹理对象*******************************/
function configureCubeMap(program) {
	gl.activeTexture(gl.TEXTURE0);

    cubeMap = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeMap);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    gl.uniform1i(gl.getUniformLocation(program, "cubeSampler"), 0);

	var faces = [
	    ["./skybox/right.jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_X],
        ["./skybox/left.jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_X],
        ["./skybox/top.jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_Y],
        ["./skybox/bottom.jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_Y],
        ["./skybox/front.jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_Z],
        ["./skybox/back.jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]
		];
    for (var i = 0; i < 6; i++) {
        var face = faces[i][1];
        var image = new Image();
        image.src = faces[i][0];
        image.onload = function (cubeMap, face, image) {
            return function () {
		        gl.texImage2D(face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            }
        }(cubeMap, face, image);
    }
}

/*TODO1:创建一般2D颜色纹理对象并加载图片*/
function configureTexture(image) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
        gl.TEXTURE_2D, // 指定目标为 2D 纹理
        0,              // mipmap 等级，这里一般为 0
        gl.RGB,         // GPU 内部格式（RGB 三通道）
        gl.RGB,         // 源图像格式（image 也是 RGB）
        gl.UNSIGNED_BYTE, // 每个通道使用 0–255 整数
        image           // 最终上传的图片对象（Image / Canvas / Video）
    );
    gl.generateMipmap(gl.TEXTURE_2D); 
    // 自动生成多个分辨率的 mipmap，提高缩小时渲染质量

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
    // 指定缩小时纹理过滤方式：使用最邻近像素 + 线性混合 mipmap

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    return texture;
}