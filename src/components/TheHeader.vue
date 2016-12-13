<template>
  <nav class="navbar navbar-fixed-top navbar-dark bg-inverse">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">

          <a href="#" class="navbar-brand">hello</a>

          <button class="navbar-toggler hidden-sm-up float-xs-right" type="button" data-toggle="collapse" data-target="#navbarResponsive">
          </button>

          <div class="collapse navbar-toggleable-xs" id="navbarResponsive">
            <ul class="nav navbar-nav float-xs-right text-xs-right">
              <li class="nav-item">
                <a href="#" class="nav-link">Search</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">Log In</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">Cart</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: "TheHeader"
}
</script>
