<template>
<div class="flex flex-1 flex-col gap-2">

  <div class="flex flex-1 flex-row gap-2 items-stretch ">
    
    <Wrapper class="flex flex-1 flex-col gap-2 h-full">
      
      <Card class="flex flex-1 h-full">
          <CardHeader class="flex flex-1 border-b-0 justify-between">
            <div class="flex flex-1 flex-row gap-3 mr-1 ml-1">
              <Icon name="groups" />
              <span class="text-accent"> Liste des Intervenants </span>
            </div>
            <div class="flex flex-row">
              <Link class="p-2" to="/" icon="add" ></Link>
              <Link class="p-2" to="/" icon="read_more" ></Link>
            </div>
          </CardHeader>
        </Card>
       
            <CondencedContributorTable></CondencedContributorTable>
         
    </Wrapper>

    <Wrapper class="flex flex-1 flex-col gap-2 h-full">
      
        <Card class="flex flex-1 h-full">
          <CardHeader class="flex flex-1 border-b-0 justify-between">
            <div class="flex flex-1 flex-row gap-3 mr-1 ml-1">
              <Icon name="groups" />
              <span class="text-accent"> Liste des Prospects </span>
            </div>
            <div class="flex flex-row">
              <Link class="p-2" to="/" icon="add" ></Link>
              <Link class="p-2" to="/" icon="read_more" ></Link>
            </div>
          </CardHeader>
        </Card>
       
            <CondencedClientTable></CondencedClientTable>
         
    </Wrapper>

  </div>
  <Wrapper class="flex flex-1 flex-col gap-2">
      
      <Card class="flex flex-1">
        <CardHeader class="flex flex-1 border-b-0 justify-between">
          <div class="flex flex-1 flex-row gap-3 mr-1 ml-1">
            <Icon name="library_books" />
            <span class="text-accent"> Liste des Études </span>
          </div>
          <div class="flex flex-row">
            <Link class="p-2" to="/" icon="add" ></Link>
            <Link class="p-2" to="/" icon="read_more" ></Link>
          </div>
        </CardHeader>
      </Card>
     
          <CondencedProjectTable></CondencedProjectTable>
       
  </Wrapper>
  
</div>

</template>

<script lang="ts" setup>

</script>
