<template>
    <div class="color-preview-area">
        <div class="input-group">
            <ColorFinder :updateColor="updateColor"/>
            <Hex
                :red="red"
                :green="green"
                :blue="blue"
                :updateColor="updateColor"
            />
            <ColorDefault :updateColor="updateColor"/>
            <!-- <RGB
                :red="red"
                :green="green"
                :blue="blue"
                :alpha="alpha"
                :updateColor="updateColor"
            /> -->
        </div>
    </div>
</template>

<script src="./script.js" />
