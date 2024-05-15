<template>
  <div class="flex flex-1 flex-col gap-2">
    <div class="flex flex-1 flex-row items-stretch gap-2">
      <Wrapper class="flex h-full flex-1 flex-col gap-2">
        <Card class="flex h-full flex-1">
          <CardHeader class="flex flex-1 justify-between border-b-0">
            <div class="ml-1 mr-1 flex flex-1 flex-row gap-3">
              <Icon name="groups" />
              <span class="text-accent"> Liste des Intervenants</span>
            </div>
            <div class="flex flex-row">
              <Link class="p-2" to="/members/new" icon="add"> </Link>
              <Link class="p-2" to="/members" icon="read_more"> </Link>
            </div>
          </CardHeader>
        </Card>

        <CondencedContributorTable></CondencedContributorTable>
      </Wrapper>

      <Wrapper class="flex h-full flex-1 flex-col gap-2">
        <Card class="flex h-full flex-1">
          <CardHeader class="flex flex-1 justify-between border-b-0">
            <div class="ml-1 mr-1 flex flex-1 flex-row gap-3">
              <Icon name="groups" />
              <span class="text-accent"> Liste des Prospects </span>
            </div>
            <div class="flex flex-row">
              <Link class="p-2" to="projects/clients/new" icon="add"> </Link>
              <Link class="p-2" to="projects/clients" icon="read_more"> </Link>
            </div>
          </CardHeader>
        </Card>

        <CondencedClientTable></CondencedClientTable>
      </Wrapper>
    </div>
    <Wrapper class="flex flex-1 flex-col gap-2">
      <Card class="flex flex-1">
        <CardHeader class="flex flex-1 justify-between border-b-0">
          <div class="ml-1 mr-1 flex flex-1 flex-row gap-3">
            <Icon name="library_books" />
            <span class="text-accent"> Liste des Études </span>
          </div>
          <div class="flex flex-row">
            <Link class="p-2" to="projects/new" icon="add"> </Link>
            <Link class="p-2" to="/projects/list" icon="read_more"> </Link>
          </div>
        </CardHeader>
      </Card>

      <CondencedProjectTable></CondencedProjectTable>
    </Wrapper>
  </div>
</template>

<script lang="ts" setup></script>
