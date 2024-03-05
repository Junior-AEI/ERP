<template>
  <Wrapper>
    <Card class="w-full">
      <CardHeader>
        <Icon name="inbox" />
        <span class="text-accent">Ticket reçus</span>
      </CardHeader>
      <CardContent>
        <Message
          title="Problème de connexion"
          user="John Doe"
          :date="new Date('2024-03-05T09:24:00')"
        />
        <Message
          title="Problème de connexion"
          user="John Doe"
          :date="new Date('2024-03-04T09:24:00')"
        />
        <Message
          title="Problème de connexion"
          user="John Doe"
          :date="new Date('2024-03-02T11:00:00')"
        />
      </CardContent>
    </Card>
  </Wrapper>
</template>

<script setup lang="ts"></script>
