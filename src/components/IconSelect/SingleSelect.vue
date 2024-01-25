<template>
  <div>
    <div @click="dialog = true" class="selectIcon">
      <v-icon v-if="selectIcon !== ''" large color="primary">
        {{ selectIcon }}
      </v-icon>
      <span v-else>vazio </span>
    </div>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          Selecione um ícone
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Procurar ícones"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                v-for="(icon, index) in filteredIcons"
                :key="index"
                cols="12"
                sm="4"
                md="3"
                lg="2"
                :class="{
                  'light-blue lighten-4': selectIcon.includes(icon),
                }"
              >
                <v-icon
                  large
                  :class="{ 'primary--text': icon === selectIcon }"
                  color="primary"
                  @click="addIcon(icon)"
                >
                  {{ icon }}
                </v-icon>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
    
<script>
export default {
  name: "SingleSelect",
  props: {
    selectIcon: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      dialog: false,
      search: "",
    };
  },
  computed: {
    filteredIcons() {
      const icons = [
        "mdi-home",
        "mdi-account",
        "mdi-email",
        "mdi-bell",
        "mdi-camera",
        "mdi-map-marker",
        "mdi-phone",
        "mdi-school",
        "mdi-help",
        "mdi-settings",
        "mdi-airplane",
        "mdi-alarm",
        "mdi-basket",
        "mdi-battery",
        "mdi-bike",
        "mdi-book-open",
        "mdi-briefcase",
        "mdi-calendar",
        "mdi-car",
        "mdi-castle",
        "mdi-chart-bar",
        "mdi-check-circle",
        "mdi-city",
        "mdi-clock",
        "mdi-cloud",
        "mdi-crosshairs-gps",
        "mdi-cup",
        "mdi-diamond",
        "mdi-earth",
        "mdi-emoticon",
        "mdi-eye",
        "mdi-face",
        "mdi-file",
        "mdi-fire",
        "mdi-flag",
        "mdi-flower",
        "mdi-folder",
        "mdi-gift",
        "mdi-glass-cocktail",
        "mdi-hammer",
        "mdi-heart",
        "mdi-hospital",
        "mdi-image",
        "mdi-key",
        "mdi-lamp",
        "mdi-leaf",
        "mdi-lightbulb",
        "mdi-lock",
        "mdi-magnet",
        "mdi-microphone",
        "mdi-music-note",
        "mdi-newspaper",
        "mdi-palette",
        "mdi-paperclip",
        "mdi-paw",
        "mdi-pen",
        "mdi-pencil",
        "mdi-phone-classic",
        "mdi-piano",
        "mdi-pine-tree",
        "mdi-pizza",
        "mdi-plane",
        "mdi-planet",
        "mdi-play-box-outline",
        "mdi-police-badge",
        "mdi-pool",
        "mdi-power",
        "mdi-radiobox-marked",
        "mdi-rocket",
        "mdi-sail-boat",
        "mdi-scissors-cutting",
        "mdi-screwdriver",
        "mdi-script",
        "mdi-sd",
        "mdi-seat",
        "mdi-dumbbell",
      ];
      return icons.filter((icon) =>
        icon.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },

  methods: {
    addIcon(icon) {
      this.$emit("addIcon", icon);
      this.dialog = false;
    },
  },
};
</script>
    
<style scoped>
.selectIcon {
  width: 100%;
  height: 55px;
  border-radius: 10px;
  border: solid 1px #a3a3a3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
    