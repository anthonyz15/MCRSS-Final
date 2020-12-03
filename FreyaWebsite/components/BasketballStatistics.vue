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
        <td class="text-center">Tiros de campo</td>
        <td class="text-center">{{ Basketball_stats.twopoints }}-{{ Basketball_stats.twopointsAttempt }}</td>
      </tr>
      <tr>
        <td class="text-center">Porcentaje de Tiro de Campo (%)</td>
        <td class="text-center">{{ Basketball_stats.twopointsPercentage}}</td>
      </tr>
      <tr>
        <td class="text-center">Tiros de tres</td>
        <td class="text-center">{{ Basketball_stats.threepoints }}-{{ Basketball_stats.threepointsAttempt }}</td>
      </tr>
      <tr>
        <td class="text-center">Porcentaje de Tiro de Tres (%)</td>
        <td class="text-center">{{ Basketball_stats.threepointsPercentage}}</td>
      </tr>
      <tr>
        <td class="text-center">Tiros libres</td>
        <td class="text-center">{{ Basketball_stats.freethrow }}-{{ Basketball_stats.freethrowAttempt }}</td>
      </tr>
      <tr>
        <td class="text-center">Porcentaje de Tiro de Tiro Libre (%)</td>
        <td class="text-center">{{ Basketball_stats.freethrowPercentage}} </td>
      </tr>
      
      <tr>
        <td class="text-center">Robos</td>
        <td class="text-center">{{ Basketball_stats.steals }}</td>
      </tr>
      <tr>
        <td class="text-center">Asistencias</td>
        <td class="text-center">{{ Basketball_stats.assists }}</td>
      </tr>
      <tr>
        <td class="text-center">Tapónes</td>
        <td class="text-center">{{ Basketball_stats.blocks }}</td>
      </tr>
      <tr>
        <td class="text-center">Rebotes</td>
        <td class="text-center">{{ Basketball_stats.rebounds }}</td>
      </tr>
      <tr>
        <td class="text-center">Perdidas de balón</td>
        <td class="text-center">{{ Basketball_stats.turnovers }}</td>
      </tr>
      <tr>
        <td class="text-center">Faltas</td>
        <td class="text-center">{{ Basketball_stats.foul }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    Basketball_stats: {}
  }
};
</script>