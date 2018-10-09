<template>
	<div class="mian">
		<div class="wapper">
			<div class="container">
				<div class="tips">
					<div>已发布30个</div>
					<div style="color:#84DDDD;">建设中7个</div>
				</div>
				<canvas id="myCanvas"></canvas>
				<div class="dot">
					<div class="box">
						<h1>系统性能分析平台</h1>
						<div class="text">
							<span><i>子系统</i></span>
							<span><i>子系统</i></span>
							<span><i>子系统</i></span>
						</div>
					</div>
					<!--外圈标记 -->
					<div class="radio" style="left:-25px;top:-230px"></div>
					<div class="radio" style="right:-50px;top:-235px"></div>
					<div class="radio" style="right:-125px;top:-0px"></div>
					<div class="radio" style="right:-40px;bottom:-225px"></div>
					<div class="radio" style="left:-20px;bottom:-225px"></div>
					<div class="radio" style="left:-125px;top:10px"></div>
					<!-- 内圈标记 -->
					<div class="radio" style="left:15px;top:0px"></div>
					<div class="radio" style="right:15px;top:0px"></div>
					<div class="radio" style="right:-15px;top:57px;"></div>
					<div class="radio" style="left:-12px; top:60px;"></div>
					<div class="radio" style="left:20px;top:115px;"></div>
					<div class="radio" style="right:13px;top:110px;"></div>
				</div>
				<div class="pulse"></div>
				<div class="pulse1"></div>
				<div class="pulse2"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data() {
        return {};
    },
    mounted() {
        var myCanvas = document.getElementById("myCanvas");
        var width = myCanvas.offsetWidth;
        //  计算画布的高度
        var height = myCanvas.offsetHeight;
        myCanvas.width = width;
        myCanvas.height = height;
        var ctx = myCanvas.getContext("2d");
        //顺时针线条
        ctx.moveTo(130, 265);
        ctx.lineTo(90, 30);

        ctx.moveTo(220, 260);
        ctx.lineTo(280, 30);

        ctx.moveTo(260, 320);
        ctx.lineTo(550, 170);

        ctx.moveTo(220, 370);
        ctx.lineTo(270, 600);

        ctx.moveTo(135, 380);
        ctx.lineTo(100, 600);

        ctx.moveTo(100, 325);
        ctx.lineTo(0, 280);

        ctx.strokeStyle = "#5385ff";
        ctx.stroke();
    }
};
</script>
<style lang="stylus" scoped>
.mian {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: #f3f3f3;
}

.tips {
	margin-top: 30px;
	width: 145px;
	height: 90px;
	border-radius: 4px;
	background-color: rgba(255, 255, 255, 0.8);
	border: 1px solid rgba(237, 237, 237, 1);

	div {
		color: rgba(83, 133, 255, 1);
		font-size: 1em;
		margin: 20px 0 0 20px;

		&:before {
			content: '';
			display: inline-block;
			width: 14px;
			height: 14px;
			background-color: rgb(83, 133, 255);
			border: 2px solid rgb(203, 221, 255);
			border-radius: 50%;
			margin-right: 10px;
		}
	}
}

.box {
	position: absolute;
	top: -310px;
	left: -520px;
	min-width: 500px;
	min-height: 200px;
	opacity: 0.7;
	border-radius: 4px;
	text-align: center;
	border: 1px solid rgba(83, 133, 255, 0.55);
	padding: 20px 30px;

	&:before {
		position: absolute;
		left: -1px;
		top: 10px;
		content: '';
		width: 0px;
		height: 0px;
		border-width: 20px;
		border-style: solid;
		border-color: transparent transparent transparent #5385ff;
	}

	h1 {
		color: rgba(83, 133, 255, 1);
		font-size: 1.2em;
		text-align: left;
	}

	.text {
		text-align: left;

		span {
			width: 49%;
			color: rgba(83, 133, 255, 0.7);
			font-size: 14px;
			text-align: left;
			display: inline-block;
			margin-top: 30px;

			&:before {
				content: '';
				display: inline-block;
				width: 14px;
				height: 14px;
				background-color: rgb(83, 133, 255);
				border: 2px solid rgb(203, 221, 255);
				border-radius: 50%;
				margin-right: 10px;
			}
			i{
				cursor pointer
			}
		}
	}
}

.radio {
	position: absolute;
	width: 23px;
	height: 23px;
	background-color: rgb(83, 133, 255);
	border: 6px solid rgb(203, 221, 255);
	border-radius: 50%;
}

#myCanvas {
	height: 650px;
	width: 350px;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}

/* 保持大小不变的小圆圈 */
.dot {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 140px;
	height: 140px;
	border: 1px solid #5385ff;
	border-radius: 50%;
	z-index: 2;
}

/* 产生动画（向外扩散变大）的圆圈 */
.pulse {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 800px;
	height: 800px;
	border: 3px solid #fdfdfd;
	border-radius: 50%;
	z-index: 1;
	opacity: 0;
	animation: warn 6s ease-out;
	animation-iteration-count: infinite;
	box-shadow: 1px 1px 30px #5385FF;
	background: rgba(0,150,255, .1);
}

.pulse1 {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 800px;
	height: 800px;
	border: 1px solid #5385FF;
	border-radius: 50%;
	z-index: 1;
	opacity: 0;
	animation: warn1 4s ease-out;
	animation-iteration-count: infinite;
	background: rgba(0,150,255, .1);
	// box-shadow: 1px 1px 30px #5385FF;
}

.pulse2 {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 800px;
	height: 800px;
	border: 1px solid #5385FF;
	border-radius: 50%;
	z-index: 1;
	opacity: 0;
	animation: warn2 5s ease-out;
	animation-iteration-count: infinite;
	background: rgba(0,150,255, .1);
	// box-shadow: 1px 1px 30px #5385FF;
}

@keyframes warn {
	0% {
		transform: scale(0.3);
		opacity: 0;
	}

	50% {
		transform: scale(0.5);
		opacity: 0.3;
	}

	100% {
		transform: scale(0.7);
		opacity: 0;
	}
}

@keyframes warn1 {
	0% {
		transform: scale(0.8);
		opacity: 0;
	}

	50% {
		transform: scale(1);
		opacity: 0.3;
	}

	100% {
		transform: scale(2);
		opacity: 0;
	}
}

@keyframes warn2 {
	0% {
		transform: scale(1.5);
		opacity: 0;
	}

	50% {
		transform: scale(2);
		opacity: 0.3;
	}

	100% {
		transform: scale(3);
		opacity: 0;
	}
}
</style>
