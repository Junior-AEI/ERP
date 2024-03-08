<template>
  <div>
    <Wrapper class="gap-6">
      <Card class="p-3">
        <div class="flex flex-1 items-center justify-center text-6xl">
          <Icon name="person" />
        </div>
      </Card>
      <div>
        <div class="mt-4">
          <h3 class="text-3xl text-accent">Hugo Bastien</h3>
          <div class="flex flex-wrap gap-x-3">
            <Elevated class="mt-2 p-2 text-sm">
              <div class="flex items-center justify-between">
                <Icon name="work" class="mr-2" />
                <span> Vice-Trésorier 2023-2024</span>
              </div>
            </Elevated>
            <Elevated class="mt-2 p-2 text-sm">
              <div class="flex items-center justify-between">
                <Icon name="person" class="mr-2" />
                <span>Intervenant</span>
              </div>
            </Elevated>
          </div>
        </div>
      </div>
    </Wrapper>
  </div>
</template>
