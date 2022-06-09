<script>
    import { appState } from '../stores/appState.js';
    import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink
    } from 'sveltestrap';

    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }

    function handleNavClick(menuItem) {
        isOpen = !isOpen;
        if ($appState.mainNav !== menuItem) {
            $appState.mainNav = menuItem;
        }
    }
</script>
  
<Navbar color="light" light expand="md">
    <NavbarBrand href="/">DLMDSSCTDS01 mapping demo</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} style="background-color: #f8f9fa;" navbar expand="md" on:update={handleUpdate}>
        <Nav class="ms-auto" navbar>
            <NavItem>
                <NavLink href="#" on:click={() => handleNavClick('choropleth')}>
                    <span class:active="{$appState.mainNav === 'choropleth'}">Choropleth</span>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#" on:click={() => handleNavClick('pointmap')}>
                    <span class:active="{$appState.mainNav === 'pointmap'}">Point map</span>
                </NavLink>
            </NavItem>
        </Nav>
    </Collapse>
</Navbar>

<slot />

<style>
    .active {
        font-weight: bold;
    }
</style>