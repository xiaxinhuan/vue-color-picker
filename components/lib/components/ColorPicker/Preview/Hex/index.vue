<template>
    <Input
    :value="hexValue"
    @input="changeHex"
    :onFocus="() => inProgress = true"
    :onBlur="() => inProgress = false"
    :inProgress="inProgress"
    classes="hex"
    />
</template>

<script src="./script.js" />
