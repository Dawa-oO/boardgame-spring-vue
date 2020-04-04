<template>
    <div class="labelImage col-xl-4 col-md-6 mb-4">
        <div class="card border-0 shadow">
            <img :src="row.image_url" class="card-img-top image" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title mb-0">{{row.label}}</h5>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'CardImage',
        props: ["row"]
    }

</script>

<style scoped>
    .image {
        object-fit: contain;
        width: 300px;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5%;
    }
    .card {
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    }
</style>