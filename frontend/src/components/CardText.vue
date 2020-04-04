<template>
    <div class="labelText col-xl-4 col-md-6 mb-4">
        <div class="card border-0 shadow to-bottom full-height">
            <div class="card-body text-center to-inherit">
                <h1 class="card-title mb-0">{{row.label2}}</h1>
            </div>
            <div class="card-body text-center to-bottom">
                <h5 class="card-title mb-0">{{row.label1}}</h5>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'CardText',
        props: ["row"]
    }

</script>

<style scoped>
    .to-inherit {
        height: inherit;
    }
    .full-height {
        height: 100%;
    }
    .full-height h1 {
        margin-top: 40%;
    }
    .card {
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    }
</style>