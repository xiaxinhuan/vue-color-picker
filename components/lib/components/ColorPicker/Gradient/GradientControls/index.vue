<template>
    <div class="gradient-controls">
        <div class="gradient-degrees-options" v-if="type === 'linear'">
            <div>渐变角度：</div>
            <div class="gradient-degrees-right-box">
                <!-- <div>{{degree}}&#176;</div> -->
                <input class="degree_input" v-model="inputDegree" @change="inputDegreeChange">
                <div
                    class="gradient-degrees"
                    @mousedown="mouseEvents"
                    @click="onClickGradientDegree"
                >
                    <div class="gradient-degree-center" :style="degreesStyle">
                        <div class="gradient-degree-pointer" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./script.js" />