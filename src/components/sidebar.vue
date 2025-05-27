<template>
    <nav id="sidebar" v-bind:class="[sidebarActive ? 'active' : '']">
        <div class="h-100 px-5 py-4 montserat-font text-center text-white blue-background_color sidebar-opacity">
            <a href="/">
                <h6><i><span>
                    <slot name="page-title-link"></slot>
                </span></i></h6>
            </a>
            <h4>
                <span>
                    <slot name="page-name">Default Page Name</slot>
                </span>
            </h4>
            <p class="text-left">
                <slot name="body-blurb"></slot>
            </p>
            <!--This section is for any page centric items-->
            <slot name="sidebar-body"></slot>

            <br>

            <!--This section is for the other page nav links-->
            <slot name="sidebar-navlinks"></slot>
        </div>
    </nav>

</template>

<script>
    export default {
        name: 'SideBar',
        props: ['sidebarActive', 'title', 'name'],
        components: {
        },
        data () {
            return {
            }
        },
        created() {

        },
        mounted () {
            console.debug("SideBar mounted called.")
        },
        destroyed() {
        },
        methods: {
        },
        computed: {
        },
    }

</script>
<style scoped>
    #sidebar {
        min-width: 300px;
        max-width: 300px;
        background: #7386D5;
        color: #fff;
        transition: all 0.6s cubic-bezier(0.945, 0.020, 0.270, 0.665);
        transform-origin: bottom left;
    }

    #sidebar.active {
        margin-left: -300px;
        transform: rotateY(100deg);
    }

    #sidebar .sidebar-header {
        padding: 20px;
        background: #6d7fcc;
    }

    #sidebar ul.components {
        padding: 20px 0;
        border-bottom: 1px solid #47748b;
    }

    #sidebar ul p {
        color: #fff;
        padding: 10px;
    }

    #sidebar ul li a {
        padding: 10px;
        font-size: 1.1em;
        display: block;
    }
    #sidebar ul li a:hover {
        color: #7386D5;
        background: #fff;
    }

    #sidebar ul li.active > a, a[aria-expanded="true"] {
        color: #fff;
        background: #6d7fcc;
    }

    #sidebarCollapse {
        width: 40px;
        height: 40px;
        background: #f5f5f5;
    }

    #sidebarCollapse span {
        width: 80%;
        height: 2px;
        margin: 0 auto;
        display: block;
        background: #555;
        transition: all 0.8s cubic-bezier(0.810, -0.330, 0.345, 1.375);
    }
    #sidebarCollapse span:first-of-type {
        /* rotate first one */
        transform: rotate(45deg) translate(2px, 2px);
    }
    #sidebarCollapse span:nth-of-type(2) {
        /* second one is not visible */
        opacity: 0;
    }
    #sidebarCollapse span:last-of-type {
        /* rotate third one */
        transform: rotate(-45deg) translate(1px, -1px);
    }
    #sidebarCollapse.active span {
        /* no rotation */
        transform: none;
        /* all bars are visible */
        opacity: 1;
        margin: 5px auto;
    }
    #sidebarCollapse {
        position: relative;
        z-index: 1000;
        top: 7em;
        left: .75em;
    }

    .sidebar-opacity {
        opacity: 0.9;
    }
    @media (max-width: 768px) {
        #sidebar {
            margin-left: -300px;
        }
        #sidebar.active {
            margin-left: 0;
        }
        #sidebar.active {
            margin-left: 0;
            transform: none;
        }
        #sidebarCollapse span:first-of-type,
        #sidebarCollapse span:nth-of-type(2),
        #sidebarCollapse span:last-of-type {
            transform: none;
            opacity: 1;
            margin: 5px auto;
        }
        #sidebarCollapse.active span {
            margin: 0 auto;
        }
        #sidebarCollapse.active span:first-of-type {
            transform: rotate(45deg) translate(2px, 2px);
        }
        #sidebarCollapse.active span:nth-of-type(2) {
            opacity: 0;
        }
        #sidebarCollapse.active span:last-of-type {
            transform: rotate(-45deg) translate(1px, -1px);
        }
        /*#sidebarCollapse span {
            display: none;
        }*/
    }
</style>
