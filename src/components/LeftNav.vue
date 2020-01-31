<template >
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
            <ul class="nav flex-column mb-2">
                <NavItem v-for="link in links" :key="link.id" :title="link.title" :id="link.id" :icon_url="link.icon" :to="link.to"/>
            </ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Slayer Masters</span>
            </h6>
            <ul class="nav flex-column mb-2">
                <NavItem v-for="master in masters" :key="master.id" :title="master.name" :id="master.id" :icon_url="master.image" :to="'master'"/>
            </ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Other Links</span>
            </h6>
            <ul class="nav flex-column mb-2">
                <NavItem v-for="link in extraLinks" :key="link.id" :title="link.title" :id="link.id" :icon_url="link.icon" :url="link.url"/>
            </ul>
        </div>
    </nav>
</template>

<script>
import master_json from "../data/masters";
import NavItem from "./NavItem";

export default {
	name: "LeftNav",
	components: {
		NavItem
	},
	data() {
		return {
		    links: [
				{
					id: 100,
					icon: 'hiscores.png',
					title: 'Account settings',
					to: 'config',
				},
			],
			masters: master_json.masters,
			extraLinks: [
				{
					id: 101,
					icon: 'osrswiki.png',
					title: 'OSRS Wiki',
					url: 'https://osrs.wiki/',
				},
			]
		}
	},
}

</script>

<style scoped>
    .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 100; /* Behind the navbar */
        padding: 48px 0 0; /* Height of navbar */
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    }

    .sidebar-sticky {
        position: relative;
        top: 0;
        height: calc(100vh - 48px);
        padding-top: .5rem;
        overflow-x: hidden;
        overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    }

    @supports ((position: -webkit-sticky) or (position: sticky)) {
        .sidebar-sticky {
            position: -webkit-sticky;
            position: sticky;
        }
    }

    .sidebar .nav-link {
        font-weight: 500;
        color: #333;
    }

    .sidebar .nav-link .feather {
        margin-right: 4px;
        color: #999;
    }

    .sidebar .nav-link.active {
        color: #007bff;
    }

    .sidebar .nav-link:hover .feather,
    .sidebar .nav-link.active .feather {
        color: inherit;
    }

    .sidebar-heading {
        font-size: .75rem;
        text-transform: uppercase;
    }
</style>
