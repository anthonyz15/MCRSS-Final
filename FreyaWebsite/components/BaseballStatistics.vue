<template>
  <v-simple-table fixed-header>
    <thead>
      <tr>
        <th class="text-center">ESTADÍSTICAS DE INTERÉS</th>
        <th class="text-center">VALOR DE ESTADÍSTICAS</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center">HIT</td>
        <td class="text-center">{{ baseball_stats.hit }}</td>
      </tr>
      <tr>
        <td class="text-center">AL BATE</td>
        <td class="text-center">{{ baseball_stats.atBat }}</td>
      </tr>
      <tr>
        <td class="text-center">CUADRANGULAR</td>
        <td class="text-center">{{ baseball_stats.homerun }}</td>
      </tr>
      <tr>
        <td class="text-center">CARRERA</td>
        <td class="text-center">{{ baseball_stats.run }}</td>
      </tr>
      <tr>
        <td class="text-center">CARRERA EMPUJADA</td>
        <td class="text-center">{{ baseball_stats.runBattedIn }}</td>
      </tr>
      <tr>
        <td class="text-center">PONCHE</td>
        <td class="text-center">{{ baseball_stats.strikeOut }}</td>
      </tr>
      <tr>
        <td class="text-center">BASE POR BOLA</td>
        <td class="text-center">{{ baseball_stats.baseOnBall }}</td>
      </tr>
      <tr>
        <td class="text-center">DEJADO EN BASE</td>
        <td class="text-center">{{ baseball_stats.leftOnBase }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    baseball_stats: {}
  }
};
</script>