<template>
  <div>
    <RecordMetadataField
      v-if="title"
      label="Title"
      :values="title"
      labelSuffix=":"
    />
    <RecordMetadataField
      v-if="artist"
      label="Artist"
      :values="artist"
      labelSuffix=":"
    />
    <div class="view-in-collection" v-if="collectionLink">
      <a :href="collectionLink"
        >View in the collection <Icon :name="'outbound'"
      /></a>
    </div>
    <RecordMetadataField
      v-if="attribution"
      label="Attribution"
      :values="attribution"
      labelSuffix=":"
      ><span v-html="attribution"></span
    ></RecordMetadataField>
    <RecordMetadataField
      v-if="license"
      label="License"
      :values="[{ name: license, href: license }]"
      labelSuffix=":"
    />
  </div>
</template>

<script>
import { Icon, RecordMetadataField } from "@thegetty/getty-ui";

export default {
  name: "MetadataFields",
  components: {
    Icon,
    RecordMetadataField
  },
  props: {
    title: {
      type: [String, Array],
      required: false,
      default: undefined
    },
    artist: {
      type: [String, Array],
      required: false,
      default: undefined
    },
    collectionLink: {
      type: String,
      required: false,
      default: undefined
    },
    attribution: {
      type: [String, Array],
      required: false,
      default: undefined
    },
    license: {
      type: [String, Array],
      required: false,
      default: undefined
    }
  }
};
</script>

<style lang="scss">
.m-record-metadata-field--horizontal {
  align-items: center;
}
.m-record-metadata-field__label--horizontal {
  font-size: 15px;
  min-width: 5em;
  max-width: 5em;
}
.a-delimited-field-values {
  font-size: 15px;
}
</style>
