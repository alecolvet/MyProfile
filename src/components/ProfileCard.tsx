import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTheme } from '../hooks/useTheme';
import type { PublicUser } from '../types/user';

interface ProfileCardProps {
  data: PublicUser;
  isDark?: boolean;
}

export function ProfileCard({
  data,
}: ProfileCardProps) {
  const { theme } = useTheme();

  const phone =
    data.phone.trim() || 'Não informado';

  const city =
    data.city.trim() || 'Não informado';

  const bio =
    data.bio.trim() || 'Não informado';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor:
            theme.colors.card,
          borderColor:
            theme.colors.border,
          shadowColor:
            theme.colors.text,
        },
      ]}
    >
      <Text
        style={[
          styles.name,
          {
            color: theme.colors.text,
          },
        ]}
      >
        {data.name}
      </Text>

      <Text
        style={[
          styles.username,
          {
            color:
              theme.colors.textMuted,
          },
        ]}
      >
        @{data.username}
      </Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text
            style={[
              styles.label,
              {
                color:
                  theme.colors.textMuted,
              },
            ]}
          >
            E-mail
          </Text>

          <Text
            style={[
              styles.value,
              {
                color:
                  theme.colors.text,
              },
            ]}
          >
            {data.email}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text
            style={[
              styles.label,
              {
                color:
                  theme.colors.textMuted,
              },
            ]}
          >
            Telefone
          </Text>

          <Text
            style={[
              styles.value,
              {
                color:
                  theme.colors.text,
              },
            ]}
          >
            {phone}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text
            style={[
              styles.label,
              {
                color:
                  theme.colors.textMuted,
              },
            ]}
          >
            Cidade
          </Text>

          <Text
            style={[
              styles.value,
              {
                color:
                  theme.colors.text,
              },
            ]}
          >
            {city}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.bioContainer,
          {
            borderTopColor:
              theme.colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.bioTitle,
            {
              color: theme.colors.text,
            },
          ]}
        >
          Biografia
        </Text>

        <Text
          style={[
            styles.bioText,
            {
              color:
                theme.colors.textMuted,
            },
          ]}
        >
          {bio}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  username: {
    fontSize: 15,
  },

  infoContainer: {
    marginTop: 20,
  },

  infoRow: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    marginBottom: 3,
  },

  value: {
    fontSize: 16,
    fontWeight: '500',
  },

  bioContainer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
  },

  bioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  bioText: {
    fontSize: 14,
    lineHeight: 21,
  },
});